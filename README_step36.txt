RapRise - Step 36 (Anti-regression Suite)

Aggiunte:
- Bottone "Regression Suite" nella QA Console
- Suite deterministica che simula:
  - navigazione tra schermate (incl. #notes)
  - apertura/chiusura Settings e QA
  - sanity check salvataggi (load/export)
  - controllo che il contatore errori JS non aumenti durante i test

Uso:
- Ctrl+Shift+D -> Regression Suite
- In console: RapRiseRegression.run()

Obiettivo:
- Evitare regressioni quando aggiungiamo nuove feature o cambiamo layout.
