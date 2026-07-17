"use client";

import { useState } from "react";
import LT7Icon from "./LT7Icon";
import LT7Chat from "./LT7Chat";

export default function LT7Widget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div
          className="
            fixed
            bottom-24
            left-6
            z-50
            h-[600px]
            w-[380px]
            overflow-hidden
            rounded-3xl
            border
            border-slate-800
            bg-slate-950
            shadow-2xl
          "
        >
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
            <div className="flex items-center gap-3">
              <LT7Icon size={40} shape="circle" />
              <div>
                <h2 className="font-black text-white">LT7</h2>
                <p className="text-xs text-slate-400">
                  Your AI Study Companion
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-xl text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="h-[calc(100%-73px)] overflow-hidden">
            <LT7Chat />
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed
          bottom-6
          left-6
          z-50
          rounded-full
          transition
          hover:scale-110
        "
      >
        <LT7Icon size={65} shape="circle" />
      </button>
    </>
  );
}