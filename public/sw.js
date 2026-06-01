const CACHE_VERSION = 'v2';
const CACHE_NAME = `mathquest-cache-${CACHE_VERSION}`;
const ASSETS = [
  '.',
  'index.html',
  'styles.css',
  'manifest.json',
  'ranking.json',
  'assets/icon-180.png',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/icon.svg',
  'assets/fondo.jpg',
  'assets/logo.ico',
  'assets/correcto.wav',
  'assets/incorrecto.wav',
  'assets/avatar-explorador.png',
  'assets/avatar-guardiana.png',
  'assets/avatar-maga.png',
  'assets/avatar-robot.png',
  'assets/PTSans-Bold.ttf',
  'assets/PTSans-Regular.ttf',
  'data/niveles.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return networkResponse;
        })
        .catch(() => caches.match('index.html'));
    })
  );
});
