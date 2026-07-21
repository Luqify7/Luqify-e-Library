import Link from "next/link";
import {
  ArrowRight,
  Search,
  Sparkles,
} from "lucide-react";

import CampusShowcase from "@/components/CampusShowcase";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        border-b
        border-[#e8dcc8]
        bg-[#FAF7F0]
        px-6
        py-24
        dark:border-slate-800
        dark:bg-slate-950
      "
    >

      {/* Background glow */}
      <div
        className="
          absolute
          -right-40
          -top-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#C9A96E]/20
          blur-3xl
          dark:bg-[#C9A96E]/10
        "
      />


      <div
        className="
          relative
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-16
          lg:grid-cols-2
        "
      >

        {/* LEFT */}
        <div>


          <div
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#e8dcc8]
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-[#3B2412]
              shadow-sm
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
            "
          >
            <Sparkles 
              size={16}
              className="text-[#C9A96E]"
            />

            Digital Learning Platform
          </div>



          <h1
            className="
              max-w-xl
              text-5xl
              font-black
              leading-[1.05]
              tracking-tight
              text-[#3B2412]
              md:text-6xl
              dark:text-white
            "
          >

            Welcome To

            <span className="block text-[#C9A96E]">
              Luqify e-Library
            </span>

          </h1>



          <p
            className="
              mt-6
              max-w-lg
              text-lg
              leading-relaxed
              text-[#6b5844]
              dark:text-slate-300
            "
          >
            A modern academic space where students can
            discover lecture notes, exams, tutorials,
            and learning resources in one place.
          </p>



          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-4
            "
          >

            <Link
              href="/faculties"
              className="
                group
                flex
                items-center
                gap-2
                rounded-2xl
                bg-[#3B2412]
                px-6
                py-3.5
                font-semibold
                text-white
                shadow-lg
                transition
                hover:-translate-y-1
                hover:bg-[#4b2e17]
                dark:bg-[#C9A96E]
                dark:text-black
              "
            >

              Explore Library

              <ArrowRight
                size={18}
                className="
                  transition
                  group-hover:translate-x-1
                "
              />

            </Link>



            <Link
              href="/search"
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-[#d9c7aa]
                bg-white
                px-6
                py-3.5
                font-semibold
                text-[#3B2412]
                transition
                hover:-translate-y-1
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
            >

              <Search size={18} />

              Search Resources

            </Link>


          </div>


        </div>



        {/* RIGHT VISUAL */}
        <div
          className="
            relative
            lg:translate-x-4
          "
        >

          <CampusShowcase />

        </div>


      </div>


    </section>
  );
}