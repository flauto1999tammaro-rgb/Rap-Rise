# Napoli Transit

App mobile per consultare orari e fermate dei mezzi pubblici a Napoli (autobus, metro, funicolari, tram). Include ricerca, preferiti locali, mappa fermate, calcolo percorso A-B con tempi/costi stimati e backend GTFS dedicato.

## Esperienza Pro (nuova)

- Profilo pendolare con coordinate Casa/Lavoro in Impostazioni.
- Route Planner con pulsanti smart: `Casa -> Lavoro`, `Qui -> Casa`, `Qui -> Lavoro`.
- Indicatore `Go now` che suggerisce quando partire in base alla prima corsa utile.
- Dashboard Home con `Transit Pulse` (score qualita servizio e copertura della fascia oraria).
- Alert proattivo commute in Home (stato tratta Casa/Lavoro con severita e suggerimento azione).
- Centro Avvisi dedicato con storico locale degli alert importanti (warn/critical).
- Badge non letti sul tab Avvisi con aggiornamento live.
- Filtri Avvisi per severita, periodo (oggi/7 giorni/tutto) e ordinamento data.
- Notifica locale per alert `critical` con anti-spam (cooldown) e apertura diretta tab Avvisi al tap.
- Preferenze notifiche in Impostazioni: `Off`, `Solo critical`, `Critical + warn`.
- Quiet hours configurabili (inizio/fine) per silenziare notifiche in fascia notturna.
- Centro Avvisi con contatore giornaliero (`Oggi`) oltre al conteggio non letti.

## Alert Proattivi Commute

- Endpoint backend: `/insights/commute-alert?fromLat=...&fromLon=...&toLat=...&toLon=...`.
- Se `OTP_BASE_URL` e` attivo, l'alert confronta la durata attuale con una baseline ideale e restituisce severita (`good`, `watch`, `warn`, `critical`).
- Se OTP non e` attivo, l'endpoint risponde in modalita` informativa (`info`).

## Avvio

- `npm install`
- `npm run start`

## Avvio Pro (un solo comando)

- `npm run dev:full`

Questo comando avvia:

- backend in una nuova finestra PowerShell con profilo OTP (`server/start:otp`),
- Expo web nel terminale corrente.

Utility rapida:

- `npm run dev:backend` avvia solo il backend pro in una nuova finestra.

## Deploy Web su Netlify

### Config gia pronta

- Build command: `npm run build:web`
- Publish directory: `dist`
- SPA fallback gia configurato in `netlify.toml`

### Procedura

1. Esegui push del repository su GitHub.
2. Su Netlify: `Add new site` -> `Import an existing project` -> seleziona il repo.
3. In `Site configuration` -> `Environment variables` aggiungi:
	- `EXPO_PUBLIC_BACKEND_BASE_URL=https://<tuo-backend-pubblico>`
4. Avvia deploy.

### Nota fondamentale

Il frontend su Netlify non puo` chiamare `localhost`. Devi pubblicare il backend su un dominio pubblico e usare quell'URL in `EXPO_PUBLIC_BACKEND_BASE_URL`.

### Backend pubblico rapido (Render)

1. Push su GitHub.
2. Su Render: `New` -> `Blueprint` e seleziona il repository.
3. Render usera` automaticamente `render.yaml` (servizio backend in `server`).
4. Imposta `CORS_ORIGIN=https://<tuo-sito>.netlify.app`.
5. Dopo deploy, usa `https://<backend>.onrender.com` come `EXPO_PUBLIC_BACKEND_BASE_URL` su Netlify e ridistribuisci il frontend.

## Backend GTFS (ANM + EAV)

1) `cd server`
2) `npm install`
3) `npm run gtfs:import`
4) `npm run start`

Poi imposta l'IP del PC in Impostazioni -> Backend routing.

## Routing avanzato (OpenTripPlanner)

Se vuoi percorsi completi con cambi, configura OpenTripPlanner in [server/otp/README.md](server/otp/README.md) e avvia il backend con `OTP_BASE_URL`.

## Script utili

- `npm run android`
- `npm run ios`
- `npm run web`

## Note

- I dati vengono letti dal backend GTFS locale (ANM + EAV).
- Preferiti e configurazione sono salvati in locale.
- Il calcolo percorso e` basato su GTFS statico; per risultati completi e realtime servono feed GTFS-RT o un motore routing esterno.
