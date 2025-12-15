RapRise - Step 31 (PWA Manifest + Icons + Install Prompt)

Contenuto:
- index.html (aggiornato)
- app.8eb4d2cf1c.css
- app.01e63ec119.js
- build.json
- sw.js
- offline.html
- manifest.webmanifest
- icons/ (icone PWA)

Cosa cambia:
- PWA installabile: manifest + icone + theme-color
- Install prompt: barra "Installa RapRise" (mostrata quando il browser lo consente)
- Compatibilita: GitHub Pages friendly (start_url e scope relativi)

Deploy:
1) Carica TUTTI i file e la cartella icons/ nella root.
2) Verifica che GitHub Pages serva anche sw.js e manifest.webmanifest.
3) Su Chrome/Edge: vedrai il prompt installabile quando i criteri PWA sono soddisfatti.

Nota:
- Se non compare, puo dipendere dai criteri del browser (HTTPS, engagement, ecc.). GitHub Pages e' ok.
