"use client";

import { useState } from "react";
import {
  ExternalLink,
  X,
} from "lucide-react";
import Link from "next/link";
import LT7Icon from "./LT7Icon";
import LT7Chat from "./LT7Chat";

export default function LT7Widget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 left-4 z-50 flex h-[min(650px,calc(100vh-120px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950 sm:left-6">
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-[#C9A96E]/30 blur-md" />

                <div className="relative">
                  <LT7Icon
                    size={38}
                    shape="circle"
                  />
                </div>
              </div>

              <div>
                <h2 className="font-black text-slate-900 dark:text-white">
                  LT7
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Luqify AI Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Link
                href="/lt7"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                title="Open full LT7"
                aria-label="Open full LT7"
              >
                <ExternalLink size={17} />
              </Link>

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                title="Close LT7"
                aria-label="Close LT7"
              >
                <X size={19} />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1">
            <LT7Chat />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() =>
          setOpen((current) => !current)
        }
        className="fixed bottom-6 left-4 z-50 rounded-full shadow-xl transition duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#C9A96E]/40 sm:left-6"
        aria-label={
          open ? "Close LT7" : "Open LT7"
        }
        title={
          open ? "Close LT7" : "Open LT7"
        }
      >
        <div className="relative">
          {!open && (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-[#C9A96E]/20" />

              <span className="absolute -inset-2 rounded-full bg-[#C9A96E]/10 blur-md" />
            </>
          )}

          <div className="relative">
            <LT7Icon
              size={65}
              shape="circle"
            />
          </div>
        </div>
      </button>
    </>
  );
}