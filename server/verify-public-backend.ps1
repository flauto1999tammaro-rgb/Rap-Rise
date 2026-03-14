param(
  [Parameter(Mandatory = $true)]
  [string]$BaseUrl
)

$ErrorActionPreference = 'Stop'

$base = $BaseUrl.TrimEnd('/')
Write-Host "[verify] Backend URL: $base"

$health = Invoke-WebRequest "$base/health" -UseBasicParsing | Select-Object -ExpandProperty Content
Write-Host "[verify] /health => $health"

$planUrl = "$base/plan?fromLat=40.8279&fromLon=14.1935&toLat=40.8522&toLon=14.2722"
$planStatus = Invoke-WebRequest $planUrl -UseBasicParsing | Select-Object -ExpandProperty StatusCode
Write-Host "[verify] /plan status => $planStatus"

if ($planStatus -ne 200) {
  throw "Plan endpoint is not returning 200"
}

Write-Host "[verify] OK - public backend is working."
