// service-worker.js

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  // Skip waiting so the SW activates immediately after installation
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  // Claim clients immediately so it starts controlling pages
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Just do a network fetch, no caching yet
  event.respondWith(fetch(event.request));
});
