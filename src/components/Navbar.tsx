"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

import {
  MessageCircle,
  Search,
  Bell,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const loadUnreadNotifications = async () => {
      const { count, error } = await supabase
        .from("notifications")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("read", false);

      if (!mounted) return;

      if (error) {
        console.error(
          "NOTIFICATION COUNT ERROR:",
          error.message || error
        );

        setUnreadCount(0);
        return;
      }

      setUnreadCount(count ?? 0);
    };

    void loadUnreadNotifications();

    const notificationChannel = supabase
      .channel("navbar-notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
        },
        () => {
          void loadUnreadNotifications();
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      void supabase.removeChannel(notificationChannel);
    };
  }, []);

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#e8dcc8]
        bg-[#FAF7F0]/90
        backdrop-blur-md
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-950/90
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
        "
      >
        {/* LEFT */}

        <div className="flex items-center gap-3">
          <Sidebar />

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#C9A96E]
                p-2
                shadow-md
              "
            >
              <Image
                src="/images/luqify-e-library-logo.png"
                alt="Luqify e-Library"
                width={56}
                height={56}
                priority
                unoptimized
              />
            </div>

            <h1
              className="
                text-xl
                font-black
                text-[#3B2412]
                dark:text-white
              "
            >
              Luqify
              <span className="font-medium">
                {" "}e-Library
              </span>
            </h1>
          </Link>
        </div>

        {/* DESKTOP MENU */}

        <nav
          className="
            hidden
            items-center
            gap-8
            text-sm
            font-semibold
            text-[#3B2412]
            dark:text-white
            lg:flex
          "
        >
          <Link
            href="/"
            className="transition hover:text-[#C9A96E]"
          >
            Home
          </Link>

          <Link
            href="/faculties"
            className="transition hover:text-[#C9A96E]"
          >
            Library
          </Link>

          <Link
            href="/upload"
            className="transition hover:text-[#C9A96E]"
          >
            Uploads
          </Link>

          <Link
            href="/lt7"
            className="transition hover:text-[#C9A96E]"
          >
            LT7
          </Link>
        </nav>

        {/* RIGHT */}

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search resources"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#C9A96E]
              text-[#3B2412]
              transition
              hover:bg-[#C9A96E]
              hover:text-white
              dark:text-white
            "
          >
            <Search size={18} />
          </Link>

          <Link
            href="/notifications"
            aria-label="Notifications"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#C9A96E]
              text-[#3B2412]
              transition
              hover:bg-[#C9A96E]
              hover:text-white
              dark:text-white
            "
          >
            <Bell size={18} />

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  min-h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-[#FAF7F0]
                  bg-red-600
                  px-1
                  text-[9px]
                  font-black
                  leading-none
                  text-white
                  dark:border-slate-950
                "
              >
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}
          </Link>

          <Link
            href="/messages"
            aria-label="Messages"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#C9A96E]
              text-[#3B2412]
              transition
              hover:bg-[#C9A96E]
              hover:text-white
              dark:text-white
            "
          >
            <MessageCircle size={18} />
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}