param(
  [switch]$SkipWebClear,
  [switch]$BackendOnly
)

$ErrorActionPreference = "Stop"

$rootPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverPath = Join-Path $rootPath "server"

Write-Host "[napoli-transit] Starting backend with OTP profile..."
$backendCommand = "Set-Location '$serverPath'; npm run start:otp"
Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-ExecutionPolicy", "Bypass",
  "-Command", $backendCommand
) | Out-Null

if ($BackendOnly) {
  Write-Host "[napoli-transit] Backend launched (backend-only mode)."
  exit 0
}

Start-Sleep -Milliseconds 800

Set-Location $rootPath

if ($SkipWebClear) {
  Write-Host "[napoli-transit] Starting Expo web..."
  npm run web
} else {
  Write-Host "[napoli-transit] Starting Expo web with cache clear..."
  npm run web -- --clear
}
