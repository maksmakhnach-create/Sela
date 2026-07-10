# Синхронизирует TELEGRAM_* из .env.local в Netlify.
# Перед запуском: npx netlify login && npx netlify link

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root ".env.local"

if (-not (Test-Path $envFile)) {
  Write-Error "Файл .env.local не найден. Создайте его по образцу .env.example"
}

Write-Host "Импорт переменных из .env.local в Netlify..."
Push-Location $root
try {
  npx --yes netlify-cli env:import .env.local
  Write-Host ""
  Write-Host "Готово. Запустите новый деплой в Netlify: Deploys -> Trigger deploy -> Deploy site"
} finally {
  Pop-Location
}
