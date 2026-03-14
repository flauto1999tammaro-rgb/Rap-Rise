$ErrorActionPreference = "Stop"

$otpJar = Join-Path $PSScriptRoot "otp.jar"
$dataDir = Join-Path $PSScriptRoot "data"

if (-not (Test-Path $otpJar)) {
  Write-Host "OTP jar not found at $otpJar"
  Write-Host "Run .\download-otp.ps1 first."
  exit 1
}

Write-Host "Starting OpenTripPlanner..."
& java -Xmx4G -jar $otpJar --load $dataDir --serve
