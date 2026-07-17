import Link from "next/link";
import LT7Icon from "@/components/LT7Icon";

export default function LT7Page() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] px-6 py-20 text-[#3B2412] dark:bg-slate-950 dark:text-white">

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">


        {/* Icon */}
        <div className="rounded-full bg-white p-5 shadow-lg dark:bg-slate-900">

          <LT7Icon
            size={90}
            shape="circle"
          />

        </div>



        <h1 className="mt-8 text-5xl font-black">
          LT7 Assistant
        </h1>



        <p className="mt-5 max-w-xl text-lg text-[#6b5845] dark:text-slate-400">

          Your intelligent academic companion designed to help students
          understand concepts, prepare better and improve their learning journey.

        </p>




        {/* Coming Soon Card */}
        <div className="mt-10 w-full rounded-3xl border border-[#C9A96E] bg-white p-8 text-left shadow-sm dark:bg-slate-900">


          <h2 className="text-xl font-black">
            Coming Soon
          </h2>


          <p className="mt-2 text-slate-500">
            LT7 will bring powerful academic tools directly into your learning experience.
          </p>



          <ul className="mt-6 space-y-4 text-slate-700 dark:text-slate-300">


            <li>
              ✅ Ask academic questions
            </li>


            <li>
              ✅ Generate study quizzes
            </li>


            <li>
              ✅ Explain difficult topics
            </li>


            <li>
              ✅ Project and assignment assistance
            </li>


            <li>
              ✅ Personal learning support
            </li>


          </ul>


        </div>




        {/* Back Button */}
        <Link
          href="/"
          className="
            mt-10
            rounded-xl
            bg-[#3B2412]
            px-8
            py-3
            font-bold
            text-white
            transition
            hover:scale-105
          "
        >
          Back to Library
        </Link>



      </div>


    </main>
  );
}