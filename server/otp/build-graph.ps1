$ErrorActionPreference = "Stop"

$otpJar = Join-Path $PSScriptRoot "otp.jar"
$dataDir = Join-Path $PSScriptRoot "data"
$gtfsDir = Join-Path $dataDir "gtfs"
$osmFile = Join-Path $dataDir "campania-latest.osm.pbf"

$anmUrl = "https://www.anm.it/google/google-transit.zip"
$eavUrl = "https://www.wimob.it/cfile/download.php?file=google-transit.zip"
$osmUrl = "https://download.geofabrik.de/europe/italy/campania-latest.osm.pbf"

if (-not (Test-Path $otpJar)) {
  Write-Host "OTP jar not found at $otpJar"
  Write-Host "Run .\download-otp.ps1 first."
  exit 1
}

New-Item -ItemType Directory -Force -Path $gtfsDir | Out-Null

if (-not (Test-Path (Join-Path $gtfsDir "anm.zip"))) {
  Write-Host "Downloading ANM GTFS..."
  Invoke-WebRequest -Uri $anmUrl -OutFile (Join-Path $gtfsDir "anm.zip")
}

if (-not (Test-Path (Join-Path $gtfsDir "eav.zip"))) {
  Write-Host "Downloading EAV GTFS..."
  Invoke-WebRequest -Uri $eavUrl -OutFile (Join-Path $gtfsDir "eav.zip")
}

if (-not (Test-Path $osmFile)) {
  Write-Host "Downloading Campania OSM extract..."
  Invoke-WebRequest -Uri $osmUrl -OutFile $osmFile
}

Write-Host "Building OTP graph..."
& java -Xmx4G -jar $otpJar --build $dataDir --save
