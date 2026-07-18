import Link from "next/link";
import Sidebar from "./Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e8dcc8] bg-[#FAF7F0]/90 backdrop-blur-md shadow-sm dark:border-slate-800 dark:bg-slate-950/90">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">


        {/* Logo */}
        <div className="flex items-center gap-4">

          <Sidebar />


          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-black tracking-tight text-[#3B2412] dark:text-white"
          >
            📖

            <span>
              Luqify
              <span className="font-medium">
                {" "}e-Library
              </span>
            </span>

          </Link>

        </div>



        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 text-sm font-medium lg:flex">


          <Link
            href="/"
            className="text-[#3B2412] transition hover:text-[#C9A96E] dark:text-slate-300 dark:hover:text-[#C9A96E]"
          >
            Home
          </Link>


          <Link
            href="/faculties/commerce"
            className="text-[#3B2412] transition hover:text-[#C9A96E] dark:text-slate-300 dark:hover:text-[#C9A96E]"
          >
            Library
          </Link>


          <Link
            href="/faculties/commerce"
            className="text-[#3B2412] transition hover:text-[#C9A96E] dark:text-slate-300 dark:hover:text-[#C9A96E]"
          >
            Faculties
          </Link>


          <Link
            href="/ai"
            className="text-[#3B2412] transition hover:text-[#C9A96E] dark:text-slate-300 dark:hover:text-[#C9A96E]"
          >
            AI Study
          </Link>


          <Link
            href="/"
            className="text-[#3B2412] transition hover:text-[#C9A96E] dark:text-slate-300 dark:hover:text-[#C9A96E]"
          >
            About
          </Link>


        </nav>



        {/* Right Controls */}

        <div className="flex items-center gap-3">


          {/* Search */}

          <Link
            href="/search"
            aria-label="Search"
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

            <Search size={18}/>

          </Link>



          {/* Theme */}

          <ThemeToggle />


        </div>


      </div>

    </header>
  );
}