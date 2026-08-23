"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (!("serviceWorker" in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        console.log(
          "Luqify Service Worker registered:",
          registration.scope
        );
      } catch (error) {
        console.error(
          "Luqify Service Worker registration failed:",
          error
        );
      }
    };

    void registerServiceWorker();
  }, []);

  return null;
}