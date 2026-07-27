"use client";

import Link from "next/link";
import Image from "next/image";

import Sidebar from "./Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

import {
  Bell,
  MessageCircle,
  Search,
} from "lucide-react";


export default function Navbar() {

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


          {/* SIDEBAR BUTTON */}

          <Sidebar />



          <Link
            href="/"
            className="
              flex
              items-center
              gap-3
            "
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
                src="/images/Luqify e-library-logo.png"
                alt="Luqify e-Library"
                width={44}
                height={44}
                priority
                className="object-contain"
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
            className="hover:text-[#C9A96E]"
          >
            Home
          </Link>


          <Link
            href="/faculties"
            className="hover:text-[#C9A96E]"
          >
            Library
          </Link>


          <Link
            href="/upload"
            className="hover:text-[#C9A96E]"
          >
            Uploads
          </Link>


          <Link
            href="/lt7"
            className="hover:text-[#C9A96E]"
          >
            LT7
          </Link>


        </nav>






        {/* RIGHT */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >


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

            <Search size={18}/>

          </Link>




          <Link
            href="/notifications"
            aria-label="Notifications"
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

            <Bell size={18}/>

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

            <MessageCircle size={18}/>

          </Link>



          <ThemeToggle />


        </div>


      </div>


    </header>

  );

}