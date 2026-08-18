"use client";

import Link from "next/link";
import {
  Upload,
  Library,
  ArrowRight,
} from "lucide-react";

export default function AdminPage() {
  return (
    <main
      className="
        min-h-screen
        bg-[#FAF7F0]
        px-6
        py-16
        text-[#3B2412]
        dark:bg-slate-950
        dark:text-white
      "
    >
      <section className="mx-auto max-w-5xl">

        <div
          className="
            rounded-[3rem]
            bg-white
            p-10
            shadow-sm
            dark:bg-slate-900
          "
        >
          <p
            className="
              text-sm
              font-bold
              uppercase
              tracking-wider
              text-[#C9A96E]
            "
          >
            Luqify e-Library Admin
          </p>

          <h1
            className="
              mt-3
              text-4xl
              font-black
              sm:text-5xl
            "
          >
            Dashboard
          </h1>

          <p
            className="
              mt-3
              text-slate-500
              dark:text-slate-400
            "
          >
            Manage your Luqify e-Library resources.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">

          <Link
            href="/admin/upload"
            className="
              group
              rounded-[2rem]
              bg-[#3B2412]
              p-8
              text-white
              shadow-sm
              transition
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <Upload
              size={32}
              className="text-[#C9A96E]"
            />

            <h2 className="mt-6 text-2xl font-black">
              Manage Resources
            </h2>

            <p className="mt-2 text-sm text-white/70">
              View, upload and manage library resources.
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                gap-2
                text-sm
                font-bold
                text-[#C9A96E]
              "
            >
              Open Resources
              <ArrowRight
                size={16}
                className="
                  transition
                  group-hover:translate-x-1
                "
              />
            </div>
          </Link>

          <Link
            href="/upload"
            className="
              group
              rounded-[2rem]
              bg-white
              p-8
              shadow-sm
              ring-1
              ring-[#e8dcc8]
              transition
              hover:-translate-y-1
              hover:shadow-xl
              dark:bg-slate-900
              dark:ring-slate-800
            "
          >
            <Library
              size={32}
              className="text-[#C9A96E]"
            />

            <h2 className="mt-6 text-2xl font-black">
              Upload Resource
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Add new academic resources to the library.
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                gap-2
                text-sm
                font-bold
                text-[#C9A96E]
              "
            >
              Go to Upload
              <ArrowRight
                size={16}
                className="
                  transition
                  group-hover:translate-x-1
                "
              />
            </div>
          </Link>

        </div>

      </section>
    </main>
  );
}