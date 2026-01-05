
const CACHE_NAME = 'shikoku-v2';

// 使用相對路徑緩存文件
const urlsToCache = [
  './',
  './index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // 採用網路優先策略
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
