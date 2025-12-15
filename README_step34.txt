RapRise - Step 34 (Save migration + Release Notes)

Aggiunte:
- Salvataggi con schemaVersion (v2) e migrazione automatica da v1
- Snapshot automatico in backup prima di migrazione e prima di import overwrite
- Import/export con validazione e migrazione
- release-notes.json + schermata "Release Notes" (hash #notes)
- Bottone "Apri Release Notes" dentro Impostazioni

Deploy:
- Carica anche release-notes.json nella root.
- Se usi Service Worker, l'HTML e build.json si aggiornano con network-first.
