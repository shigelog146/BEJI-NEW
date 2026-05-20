const CACHE_NAME = "vegetable-app-v4";

// ===============================
// 古いキャッシュ削除
// ===============================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );
    }),
  );
});

const urlsToCache = ["./", "./index.html", "./list.html"];

// ===============================
// インストール
// ===============================
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// ===============================
// キャッシュ優先読み込み
// ===============================
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // キャッシュがあれば返す
      if (response) {
        return response;
      }

      // 無ければ通常通信
      return fetch(event.request);
    }),
  );
});
