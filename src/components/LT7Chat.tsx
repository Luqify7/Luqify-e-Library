"use client";

import LT7Icon from "@/components/LT7Icon";

export default function LT7Chat() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/70">

      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">

        <div className="flex items-center gap-4">

          <LT7Icon />

          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-2xl font-bold">
                LT7 Study Assistant
              </h2>

              <span className="animate-pulse rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                Coming Soon
              </span>

            </div>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your future AI-powered learning companion.
            </p>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur dark:border-slate-700 dark:bg-slate-800/40">

          <h3 className="text-lg font-semibold">
            What LT7 will help you do
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
              📖 Explain difficult concepts
            </div>

            <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
              📝 Summarize lecture notes
            </div>

            <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
              🧠 Generate revision quizzes
            </div>

            <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
              🎯 Help prepare for exams
            </div>

          </div>

        </div>

        <div className="mt-8 space-y-4">

          <input
            disabled
            placeholder="Ask LT7 anything..."
            className="w-full cursor-not-allowed rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          />

          <button
            disabled
            className="w-full cursor-not-allowed rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-4 font-semibold text-white opacity-60"
          >
            🚀 Launching Soon
          </button>

        </div>

        <div className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-900 dark:bg-indigo-950/40">

          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            <strong>Preview:</strong> LT7 is currently under development. In a
            future update, you'll be able to ask questions about your courses,
            generate quizzes, summarize notes, and get instant study support
            directly inside Luqify e-Library.
          </p>

        </div>

      </div>

    </div>
  );
}