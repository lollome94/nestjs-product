#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="${IMAGE_NAME:-products-service:loadtest}"
NETWORK_NAME="${NETWORK_NAME:-products-k6-net}"
MYSQL_CONTAINER_NAME="${MYSQL_CONTAINER_NAME:-products-mysql-k6}"
APP_CONTAINER_NAME="${APP_CONTAINER_NAME:-products-app-k6}"
K6_SCRIPT_PATH="${K6_SCRIPT_PATH:-k6/products-load.js}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
K6_HOST_PATH="$ROOT_DIR/k6"

remove_container_if_exists() {
  local name="$1"
  if docker ps -aq --filter "name=^${name}$" | grep -q .; then
    docker rm -f "$name" >/dev/null
  fi
}

wait_mysql_ready() {
  local max_attempts=30
  for ((i = 1; i <= max_attempts; i++)); do
    if docker exec "$MYSQL_CONTAINER_NAME" mysqladmin ping -h 127.0.0.1 -uroot -pyour_password --silent >/dev/null 2>&1; then
      return
    fi
    sleep 2
  done
  echo "MySQL did not become ready in time." >&2
  exit 1
}

wait_app_ready_in_docker_network() {
  local max_attempts=30
  for ((i = 1; i <= max_attempts; i++)); do
    if docker run --rm --network "$NETWORK_NAME" alpine:3.21 sh -c "wget -q -O /dev/null http://${APP_CONTAINER_NAME}:3000/products?page=1\&limit=1" >/dev/null 2>&1; then
      return
    fi
    sleep 2
  done
  echo "Application did not become ready in time." >&2
  exit 1
}

run_migrations_with_retry() {
  local max_attempts=10
  for ((i = 1; i <= max_attempts; i++)); do
    if docker run --rm --network "$NETWORK_NAME" \
      -e DB_HOST="$MYSQL_CONTAINER_NAME" \
      -e DB_PORT=3306 \
      -e DB_USER=root \
      -e DB_PASSWORD=your_password \
      -e DB_NAME=ecommerce \
      "$IMAGE_NAME" npm run db:migrate; then
      return
    fi
    sleep 3
  done

  echo "Database migration did not succeed after retries." >&2
  exit 1
}

if [[ ! -f "$ROOT_DIR/$K6_SCRIPT_PATH" ]]; then
  echo "k6 script not found at $K6_SCRIPT_PATH" >&2
  exit 1
fi

cleanup() {
  echo "Cleaning up containers..."
  remove_container_if_exists "$APP_CONTAINER_NAME"
  remove_container_if_exists "$MYSQL_CONTAINER_NAME"
}

trap cleanup EXIT

echo "Building application image..."
docker build -t "$IMAGE_NAME" "$ROOT_DIR"

echo "Preparing docker network and containers..."
if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
  docker network create "$NETWORK_NAME" >/dev/null
fi

remove_container_if_exists "$MYSQL_CONTAINER_NAME"
remove_container_if_exists "$APP_CONTAINER_NAME"

docker run -d --name "$MYSQL_CONTAINER_NAME" --network "$NETWORK_NAME" \
  -e MYSQL_ROOT_PASSWORD=your_password \
  -e MYSQL_DATABASE=ecommerce \
  mysql:8.4 >/dev/null

wait_mysql_ready

echo "Running migrations inside application image..."
run_migrations_with_retry

echo "Starting application container..."
docker run -d --name "$APP_CONTAINER_NAME" --network "$NETWORK_NAME" \
  -e DB_HOST="$MYSQL_CONTAINER_NAME" \
  -e DB_PORT=3306 \
  -e DB_USER=root \
  -e DB_PASSWORD=your_password \
  -e DB_NAME=ecommerce \
  "$IMAGE_NAME" >/dev/null

wait_app_ready_in_docker_network

echo "Running k6 load test..."
docker run --rm --network "$NETWORK_NAME" \
  -e BASE_URL="http://${APP_CONTAINER_NAME}:3000" \
  -v "$K6_HOST_PATH:/scripts" \
  grafana/k6 run /scripts/products-load.js
