```javascript
const CACHE_NAME = "luqify-e-library-v2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (
    requestUrl.pathname.startsWith("/api/") ||
    requestUrl.pathname.startsWith("/_next/")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (
          response.status === 200 &&
          response.type === "basic"
        ) {
          const responseClone = response.clone();

          caches
            .open(CACHE_NAME)
            .then((cache) => {
              return cache.put(
                event.request,
                responseClone
              );
            })
            .catch(() => {
              // Ignore cache errors.
            });
        }

        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return new Response(
            "Luqify e-Library is currently offline.",
            {
              status: 503,
              headers: {
                "Content-Type": "text/plain",
              },
            }
          );
        });
      })
  );
});
```
