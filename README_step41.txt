RapRise - Step 41 (Shipping polish: What's New + Perf)

Aggiunte:
- Modal "What's New" (build-aware):
  - si apre automaticamente quando cambia meta build (raprise-build)
  - legge release-notes.json (top 3 build notes)
  - pulsante in Impostazioni per aprirla manualmente
- Performance instrumentation (best-effort):
  - LCP, CLS, INP tramite PerformanceObserver (se supportato)
  - marks via RapRisePerf.mark(name)
  - persist in localStorage: raprise_perf_v1
- Idle init:
  - rerender non critici spostati in requestIdleCallback / timeout per ridurre long tasks

Build:
- CSS: app.0966e83683.css
- JS:  app.148dc7236c.js
- build.json e sw.js allineati
