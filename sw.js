const CACHE_NAME = 'map-app-v2';
const ASSETS = [
  'https://rathofcam.github.io/Map-App/game/',
  'https://rathofcam.github.io/Map-App/game/index.html',
  'https://rathofcam.github.io/Map-App/game/manifest.json',
  'https://rathofcam.github.io/Map-App/game/sw.js',
  'https://rathofcam.github.io/Map-App/game/icon-512.png'
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

