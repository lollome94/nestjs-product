param(
  [string]$ImageName = 'products-service:loadtest',
  [string]$NetworkName = 'products-k6-net',
  [string]$MySqlContainerName = 'products-mysql-k6',
  [string]$AppContainerName = 'products-app-k6',
  [string]$K6ScriptPath = 'k6/products-load.js'
)

$ErrorActionPreference = 'Stop'

function Remove-ContainerIfExists {
  param([string]$Name)

  $existing = docker ps -aq --filter "name=^${Name}$"
  if ($existing) {
    docker rm -f $Name | Out-Null
  }
}

function Wait-MySqlReady {
  param([string]$ContainerName)

  Write-Host "Waiting for MySQL to be ready..."
  $maxAttempts = 30
  for ($i = 1; $i -le $maxAttempts; $i++) {
    $currentErrorAction = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    
    docker exec $ContainerName mysqladmin ping -h 127.0.0.1 -uroot -pyour_password 2>$null | Out-Null
    $pingExitCode = $LASTEXITCODE
    
    if ($pingExitCode -eq 0) {
      docker exec $ContainerName mysql -uroot -pyour_password -e "SELECT 1;" ecommerce 2>$null | Out-Null
      if ($LASTEXITCODE -eq 0) {
        $ErrorActionPreference = $currentErrorAction
        Write-Host "MySQL is ready!"
        return
      }
    }
    
    $ErrorActionPreference = $currentErrorAction
    Write-Host "MySQL not ready yet (attempt $i/$maxAttempts)..."
    Start-Sleep -Seconds 2
  }

  throw 'MySQL did not become ready in time.'
}

function Wait-AppReadyInDockerNetwork {
  param(
    [string]$NetworkName,
    [string]$ContainerName
  )

  Write-Host "Waiting for Application to be ready..."
  $maxAttempts = 30
  for ($i = 1; $i -le $maxAttempts; $i++) {
    $result = docker run --rm --network $NetworkName alpine:3.21 sh -c "wget -T 2 -q -O- http://$ContainerName:3000/products?page=1&limit=1" 2>&1
    if ($LASTEXITCODE -eq 0) {
      Write-Host "Application is ready!"
      return
    }
    Write-Host "Application not ready yet (attempt $i/$maxAttempts)..."
    Start-Sleep -Seconds 2
  }

  throw 'Application did not become ready in time.'
}

function Run-MigrationsWithRetry {
  param(
    [string]$ImageName,
    [string]$NetworkName,
    [string]$MySqlContainerName
  )

  $maxAttempts = 10
  for ($i = 1; $i -le $maxAttempts; $i++) {
    docker run --rm --network $NetworkName -e DB_HOST=$MySqlContainerName -e DB_PORT=3306 -e DB_USER=root -e DB_PASSWORD=your_password -e DB_NAME=ecommerce $ImageName npm run db:migrate | Out-Host

    if ($LASTEXITCODE -eq 0) {
      return
    }

    Start-Sleep -Seconds 3
  }

  throw 'Database migration did not succeed after retries.'
}

$workspace = Resolve-Path "$PSScriptRoot\.."
$k6HostPath = Join-Path $workspace 'k6'

if (!(Test-Path (Join-Path $workspace $K6ScriptPath))) {
  throw "k6 script not found at $K6ScriptPath"
}

Write-Host 'Building application image...'
docker build -t $ImageName $workspace | Out-Host

Write-Host 'Preparing docker network and containers...'
docker network inspect $NetworkName | Out-Null 2>$null
if ($LASTEXITCODE -ne 0) {
  docker network create $NetworkName | Out-Null
}

Remove-ContainerIfExists -Name $MySqlContainerName
Remove-ContainerIfExists -Name $AppContainerName

try {
  docker run -d --name $MySqlContainerName --network $NetworkName -e MYSQL_ROOT_PASSWORD=your_password -e MYSQL_DATABASE=ecommerce mysql:8.4 | Out-Null
  Wait-MySqlReady -ContainerName $MySqlContainerName

  Write-Host 'Running migrations inside application image...'
  Run-MigrationsWithRetry -ImageName $ImageName -NetworkName $NetworkName -MySqlContainerName $MySqlContainerName

  Write-Host 'Starting application container...'
  docker run -d --name $AppContainerName --network $NetworkName -e DB_HOST=$MySqlContainerName -e DB_PORT=3306 -e DB_USER=root -e DB_PASSWORD=your_password -e DB_NAME=ecommerce $ImageName | Out-Null

  Wait-AppReadyInDockerNetwork -NetworkName $NetworkName -ContainerName $AppContainerName

  Write-Host 'Running k6 load test...'
  docker run --rm --network $NetworkName -e BASE_URL=http://$AppContainerName`:3000 -v "${k6HostPath}:/scripts" grafana/k6 run /scripts/products-load.js | Out-Host
} finally {
  Write-Host 'Cleaning up containers...'
  Remove-ContainerIfExists -Name $AppContainerName
  Remove-ContainerIfExists -Name $MySqlContainerName
}
