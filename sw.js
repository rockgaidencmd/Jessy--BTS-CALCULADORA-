const CACHE = "aspa-army-v3";
const BASE = "/Jessy--BTS-CALCULADORA-/";
const ASSETS = [
  BASE,
  BASE + "index.html",
  BASE + "manifest.json",
  BASE + "icon-192x192.png",
  BASE + "icon-512x512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      // allSettled evita que un solo asset que falle rompa toda la instalación
      .then(cache => Promise.allSettled(ASSETS.map(a => cache.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const isNavigation =
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isNavigation) {
    // Network-first para el HTML: así el index siempre apunta al JS con el
    // hash más reciente. Si no hay red, cae al cache (offline).
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(c => c || caches.match(BASE)))
    );
    return;
  }

  // Cache-first para assets estáticos (JS/CSS/imágenes con hash).
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});
