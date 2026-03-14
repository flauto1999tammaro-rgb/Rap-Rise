# Napoli Transit Backend

Backend locale per importare GTFS ANM + EAV e servire API all'app mobile.

## Setup

1) `npm install`
2) `npm run gtfs:import`
3) `npm run start`

## Routing avanzato (OpenTripPlanner)

Per percorsi completi con cambi, configura e avvia OpenTripPlanner:

1) `powershell -ExecutionPolicy Bypass -File .\otp\download-otp.ps1`
2) `powershell -ExecutionPolicy Bypass -File .\otp\build-graph.ps1`
3) `powershell -ExecutionPolicy Bypass -File .\otp\start-otp.ps1`

Poi avvia il backend con:

`OTP_BASE_URL=http://localhost:8080 npm run start`

Su Windows puoi usare il comando automatico (consigliato):

`npm run start:otp`

Questo script:

- verifica OTP,
- libera la porta `3001` se occupata,
- imposta `OTP_BASE_URL`,
- avvia il backend con severita predittiva reale.

Senza OTP, il percorso usa GTFS statico e solo tratte dirette.

## Deploy Backend Pubblico (Render)

### Prerequisito

- Il file database GTFS deve essere presente in `server/data/gtfs.sqlite`.

### Deploy con Blueprint (consigliato)

1) Esegui push su GitHub.
2) Apri Render -> `New` -> `Blueprint`.
3) Seleziona il repository: Render usera` `render.yaml` dalla root.
4) In `Environment` aggiorna:
	 - `CORS_ORIGIN=https://<tuo-sito-netlify>.netlify.app`
	 - `OTP_BASE_URL=` (lascia vuoto se OTP non e` pubblico)
5) Avvia deploy.

### Verifica

- `GET https://<backend>.onrender.com/health` deve rispondere `status: ok`.
- `GET https://<backend>.onrender.com/plan?fromLat=40.8279&fromLon=14.1935&toLat=40.8522&toLon=14.2722`

### Collegamento frontend

- Su Netlify imposta variabile:
	- `EXPO_PUBLIC_BACKEND_BASE_URL=https://<backend>.onrender.com`
- Esegui nuovo deploy Netlify.

## API principali

- `GET /health`
- `GET /modes`
- `GET /stops/featured`
- `GET /stops/search?query=garibaldi`
- `GET /stops/by-ids?id=anm_123&id=eav_456`
- `GET /stops/by-mode?mode=metro`
- `GET /stops/nearby?lat=40.85&lon=14.26&radius=1200`
- `GET /stops/:id`
- `GET /departures/:stopId`
- `GET /insights/quality`
- `GET /insights/commute-alert?fromLat=..&fromLon=..&toLat=..&toLon=..`
- `GET /plan?fromLat=..&fromLon=..&toLat=..&toLon=..`

Note: il calcolo percorso usa GTFS statico e puo` essere migliorato con un motore routing esterno.
