/* =========================================================
   ProInvoice Service Worker
   v2 — survives missing files, robust offline fallback
   ========================================================= */
const CACHE_NAME = 'proinvoice-v2';

/* Files to pre-cache. Missing ones will NOT break install. */
const APP_SHELL = [
  './',
  './index.html',
  './sw.js'
];

/* ---------- INSTALL ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // allSettled → one 404 won't kill the whole install
      Promise.allSettled(
        APP_SHELL.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[SW] Precache skipped:', url, err);
            return null;
          })
        )
      )
    ).then(() => self.skipWaiting())
  );
});

/* ---------- ACTIVATE ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ---------- FETCH ---------- */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (!url.protocol.startsWith('http')) return;

  /* --- Navigation requests (opening the app / refresh) --- */
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(req).then((r) =>
            r ||
            caches.match('./') ||
            caches.match('./index.html') ||
            new Response(
              '<!DOCTYPE html><meta charset="utf-8"><title>Offline</title>' +
              '<body style="font-family:system-ui;padding:40px;text-align:center">' +
              '<h1>Offline</h1><p>ProInvoice could not load. Reconnect once to cache the app.</p>' +
              '</body>',
              { headers: { 'Content-Type': 'text/html' }, status: 200 }
            )
          )
        )
    );
    return;
  }

  /* --- Same-origin assets: cache-first, network fallback --- */
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((res) => {
            // Only cache successful, same-origin, non-opaque responses
            if (!res || res.status !== 200 || res.type === 'opaque') return res;
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
            return res;
          })
          .catch(() => cached || Response.error());
      })
    );
    return;
  }

  /* --- Cross-origin (CDN fonts, tailwind, etc.): network-first --- */
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});