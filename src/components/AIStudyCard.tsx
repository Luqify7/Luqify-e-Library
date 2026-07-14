export default function AIStudyCard() {
  return (
    <div
      className="
        mt-10
        p-8
        bg-white
        rounded-2xl
        shadow-md
        border
      "
    >

      <h2 className="text-2xl font-black text-blue-900">
        🤖 Need help studying?
      </h2>

      <p className="mt-3 text-slate-500">
        Understand topics faster with Luqify AI.
      </p>


      <div className="mt-6 flex gap-4 flex-wrap">

        <button
          className="
            px-6
            py-3
            rounded-xl
            bg-blue-600
            text-white
            font-bold
            hover:scale-105
            transition
          "
        >
          ✨ Ask AI
        </button>


        <button
          className="
            px-6
            py-3
            rounded-xl
            bg-slate-100
            text-slate-800
            font-bold
            hover:scale-105
            transition
          "
        >
          🧠 Generate Quiz
        </button>

      </div>

    </div>
  );
}