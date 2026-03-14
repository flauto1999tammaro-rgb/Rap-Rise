$ErrorActionPreference = "Stop"

$otpVersion = "2.5.0"
$otpUrl = "https://repo1.maven.org/maven2/org/opentripplanner/otp/$otpVersion/otp-$otpVersion-shaded.jar"
$otpJar = Join-Path $PSScriptRoot "otp.jar"

if (Test-Path $otpJar) {
  Write-Host "OTP jar already exists at $otpJar"
  exit 0
}

Write-Host "Downloading OTP $otpVersion..."
Invoke-WebRequest -Uri $otpUrl -OutFile $otpJar
