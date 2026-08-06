const CACHE_NAME = 'chronos-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// Inst instala o service worker e guarda em cache os recursos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceta os pedidos de rede para funcionamento offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
