---
name: nestjs-testing-testcontainers
description: Use this skill for test strategy in NestJS Clean Architecture projects, including unit, integration, architecture, and e2e tests with Testcontainers-backed real databases.
---

# NestJS Testing And Testcontainers Skill

Testing blueprint to preserve correctness and architecture quality over time.

## Scope

In scope:
- test pyramid design
- Testcontainers setup and lifecycle
- integration and e2e execution patterns
- flaky test prevention

Out of scope:
- detailed architecture dependency policy definitions (owned by nestjs-architecture-overview)

## Test Pyramid

- Domain unit tests: pure domain behavior and invariants
- Application unit tests: use case orchestration with mocked ports
- Integration tests: infrastructure adapters against real database with Testcontainers
- E2E tests: HTTP behavior through Nest application instance
- Architecture tests: dependency and boundary enforcement

## Testcontainers Setup

Recommended packages:
- testcontainers
- @testcontainers/mysql or @testcontainers/postgresql based on DB

Patterns:
- Start container once per test suite when possible
- Run migrations before tests
- Inject dynamic DB connection string into Nest config
- Stop container in teardown

## Integration Testing Rules

- Use real Sequelize repositories
- Avoid mocking database in integration tests
- Verify side effects in DB state
- Keep tests deterministic with isolated fixtures

## E2E Rules

- Build app using NestFactory or testing module
- Test auth, validation, error mapping, and happy paths
- Use Supertest for HTTP assertions
- Assert response schema and status code contracts

## Architecture Test Handshake

Run architecture checks as part of CI, but source dependency policies from nestjs-architecture-overview.

## CI Policy

Required pipeline stages:
1. lint
2. architecture checks
3. unit tests
4. integration tests with Testcontainers
5. e2e tests

Fail fast on architecture violations.

## Flaky Test Prevention

1. Keep clock and random data controllable.
2. Avoid shared mutable state across tests.
3. Use explicit waits only for observable conditions.
4. Isolate ports and DB names per test run.
5. Keep container startup logs for diagnosis.
