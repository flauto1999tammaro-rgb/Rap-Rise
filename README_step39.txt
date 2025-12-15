RapRise - Step 39 (UI consistency pass)

Aggiunte:
- Design tokens in :root (bg/card/border/text/accent + radius/padding/gap + typography)
- Componenti riutilizzabili:
  - rr-toolbar, rr-rowcard, normalizzazione chip, kpi, input e button
- Pass DOM non invasivo:
  - aggiunge rr-rowcard agli rr-item
  - marca ui-card senza padding inline come "tight"

Build:
- CSS: app.0570cca438.css
- JS:  app.e0f5e1c13f.js
- build.json e sw.js allineati
