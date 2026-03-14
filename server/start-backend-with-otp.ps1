param(
  [string]$OtpBaseUrl = "http://localhost:8080",
  [int]$Port = 3001
)

$ErrorActionPreference = "Stop"

Write-Host "[napoli-transit] OTP_BASE_URL: $OtpBaseUrl"

try {
  $otpProbe = Invoke-WebRequest "$OtpBaseUrl/otp/routers/default" -UseBasicParsing -TimeoutSec 8
  Write-Host "[napoli-transit] OTP reachable (status $($otpProbe.StatusCode))."
} catch {
  Write-Warning "OTP non raggiungibile su $OtpBaseUrl. Avvio comunque il backend; la severita predittiva restera informativa."
}

$conn = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($conn) {
  $owners = $conn | Select-Object -ExpandProperty OwningProcess -Unique
  foreach ($procId in $owners) {
    Write-Host "[napoli-transit] Stopping process $procId on port $Port"
    Stop-Process -Id $procId -Force
  }
  Start-Sleep -Milliseconds 500
}

$env:OTP_BASE_URL = $OtpBaseUrl
Write-Host "[napoli-transit] Starting backend on port $Port..."
npm run start
