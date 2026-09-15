// Workforce Saudia Digital Business Card Service Worker
const CACHE_NAME = 'workforce-card-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Pass-through with network-first approach
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
