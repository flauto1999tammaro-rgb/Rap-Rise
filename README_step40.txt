RapRise - Step 40 (Preflight Gate + Release Mode lock)

Aggiunte:
- QA: bottone "Preflight Gate" (checklist automatizzata)
- QA: bottone "Enable Release Mode" (abilitato solo se Preflight passa)
- Ribbon in alto a sinistra:
  - DEV BUILD
  - PRE-FLIGHT FAIL
  - RELEASE READY
  - RELEASE MODE
- SW hardening: gestione messaggio SKIP_WAITING (se mancava)

Preflight verifica:
- Router e schermate (#home/#studio/#social/#season/#shop/#notes)
- Apertura/chiusura overlay (Settings + QA)
- Presenza e click safe dei pulsanti critici (Step37)
- Salvataggi: load/export/import roundtrip
- Service Worker status (best-effort)
- Error delta: contatore errori non aumenta durante il run

Console:
- RapRisePreflight.run()

Build:
- CSS: app.bba5e2a2f6.css
- JS:  app.2b44b939c5.js
- build.json e sw.js allineati
