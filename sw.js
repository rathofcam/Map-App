const CACHE_NAME = 'map-app-v1';
const ASSETS = [
  '/Map-App/',
  '/Map-App/index.html',
  '/Map-App/manifest.json',
  '/Map-App/sw.js',
  '/Map-App/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

