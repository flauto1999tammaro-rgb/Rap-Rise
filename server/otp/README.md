# OpenTripPlanner (OTP)

Questa cartella contiene script per configurare OTP su Windows.

## Requisiti

- Java 17+ installato e disponibile in PATH

## Passi

1) Scarica OTP:
   - `powershell -ExecutionPolicy Bypass -File .\otp\download-otp.ps1`

2) Costruisci il grafo (GTFS + OSM Campania):
   - `powershell -ExecutionPolicy Bypass -File .\otp\build-graph.ps1`

3) Avvia OTP:
   - `powershell -ExecutionPolicy Bypass -File .\otp\start-otp.ps1`

OTP sara' disponibile su `http://localhost:8080`.

## Note

- I file GTFS vengono scaricati da ANM ed EAV.
- L'estratto OSM usa la Campania per coprire Napoli e provincia.
- Dopo ogni aggiornamento GTFS, ricostruisci il grafo.
