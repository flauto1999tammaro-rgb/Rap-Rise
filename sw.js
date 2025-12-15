/* RapRise Step 30 - Safe Service Worker (cache-first for app shell, stale-while-revalidate for assets)
   Scope: repository root (GitHub Pages friendly)
*/
const BUILD_ID = "148dc7236c-0966e83683";
const CACHE_CORE = "raprise-core-" + BUILD_ID;
const CACHE_RUNTIME = "raprise-runtime-" + BUILD_ID;

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./offline.html",
  "./build.json",
  "./app.0966e83683.css",
  "./app.148dc7236c.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_CORE);
    await cache.addAll(CORE_ASSETS);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => {
      if(k.startsWith("raprise-") && ![CACHE_CORE, CACHE_RUNTIME].includes(k)) {
        return caches.delete(k);
      }
    }));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if(!event.data) return;
  if(event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isNavigation(request) {
  return request.mode === "navigate" ||
    (request.method === "GET" && request.headers.get("accept") && request.headers.get("accept").includes("text/html"));
}

function isAsset(url) {
  return url.pathname.endsWith(".js") ||
         url.pathname.endsWith(".css") ||
         url.pathname.endsWith(".png") ||
         url.pathname.endsWith(".jpg") ||
         url.pathname.endsWith(".jpeg") ||
         url.pathname.endsWith(".webp") ||
         url.pathname.endsWith(".svg") ||
         url.pathname.endsWith(".woff2") ||
         url.pathname.endsWith(".woff");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if(req.method !== "GET") return;

  const url = new URL(req.url);

  // Only handle same-origin
  if(url.origin !== self.location.origin) return;

  // HTML navigations: network-first with offline fallback to cached shell/offline page
  if(isNavigation(req)) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        // Cache latest index.html (app shell) opportunistically
        const cache = await caches.open(CACHE_CORE);
        cache.put("./index.html", fresh.clone());
        return fresh;
      } catch (e) {
        const cache = await caches.open(CACHE_CORE);
        return (await cache.match("./index.html")) || (await cache.match("./offline.html"));
      }
    })());
    return;
  }

  // Versioned core assets: cache-first
  const path = url.pathname.split("/").slice(-1)[0];
  if([ "app.8eb4d2cf1c.css", "app.01e63ec119.js", "build.json" ].includes(path)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_CORE);
      const hit = await cache.match(req);
      if(hit) return hit;
      const fresh = await fetch(req);
      cache.put(req, fresh.clone());
      return fresh;
    })());
    return;
  }

  // Other static assets: stale-while-revalidate
  if(isAsset(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_RUNTIME);
      const cached = await cache.match(req);
      const fetchPromise = fetch(req).then((fresh) => {
        cache.put(req, fresh.clone());
        return fresh;
      }).catch(() => null);

      return cached || (await fetchPromise) || (await caches.open(CACHE_CORE)).match("./offline.html");
    })());
    return;
  }

  // Default: pass-through
});