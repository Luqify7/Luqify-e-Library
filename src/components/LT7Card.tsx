import LT7Icon from "@/components/LT7Icon";

export default function LT7Card() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-center gap-5">

        <LT7Icon size={70} />

        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            LT7 Assistant
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Luqify's intelligent learning companion
          </p>
        </div>

      </div>


      <p className="mt-6 text-slate-600 dark:text-slate-300">
        Ask questions, generate quizzes and get academic support while studying your courses.
      </p>


      <div className="mt-6 grid gap-3 sm:grid-cols-3">

        <div className="rounded-xl border p-4 text-center dark:border-slate-700">
          📚
          <p className="mt-2 text-sm font-semibold">
            Study Assistant
          </p>
        </div>


        <div className="rounded-xl border p-4 text-center dark:border-slate-700">
          📝
          <p className="mt-2 text-sm font-semibold">
            Quiz Generator
          </p>
        </div>


        <div className="rounded-xl border p-4 text-center dark:border-slate-700">
          🎓
          <p className="mt-2 text-sm font-semibold">
            Academic Helper
          </p>
        </div>

      </div>


      <button
        className="
          mt-8
          w-full
          rounded-xl
          bg-slate-900
          py-3
          font-bold
          text-white
          dark:bg-white
          dark:text-black
        "
      >
        Open LT7
      </button>


    </section>
  );
}