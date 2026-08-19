"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = window.localStorage.getItem(
      "luqify-theme"
    );

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
      return;
    }

    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
      return;
    }

    // If no saved preference exists, follow the system preference.
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;

    if (nextDark) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem(
        "luqify-theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem(
        "luqify-theme",
        "light"
      );
    }

    setIsDark(nextDark);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="rounded-full border border-slate-300 p-2 opacity-0 dark:border-slate-700"
        aria-hidden="true"
        tabIndex={-1}
      >
        <Moon size={22} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-slate-300 p-2 transition hover:scale-105 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      {isDark ? (
        <Sun size={22} />
      ) : (
        <Moon size={22} />
      )}
    </button>
  );
}