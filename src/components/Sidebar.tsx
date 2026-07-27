"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  X,
  Menu,
  Home,
  Library,
  Upload,
  Bell,
  MessageCircle,
  Bot,
  Settings,
  LayoutDashboard,
  GraduationCap,
} from "lucide-react";


export default function Sidebar() {

  const [open, setOpen] = useState(false);

  const pathname = usePathname();


  const menuItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Library",
      href: "/faculties",
      icon: Library,
    },
    {
      name: "Uploads",
      href: "/upload",
      icon: Upload,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MessageCircle,
    },
    {
      name: "LT7 Assistant",
      href: "/lt7",
      icon: Bot,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];



  return (
    <>


      {/* MENU BUTTON */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"

        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          text-[#3B2412]
          transition
          hover:bg-[#C9A96E]/20
          dark:text-white
        "
      >

        <Menu size={22}/>

      </button>





      {/* OVERLAY */}

      {open && (

        <div
          onClick={() => setOpen(false)}

          className="
            fixed
            inset-0
            z-40
            bg-[#3B2412]/30
            backdrop-blur-sm
          "
        />

      )}






      {/* SIDEBAR */}


      <aside

        className={`

          fixed

          left-24
          top-6

          z-50

          h-[calc(100vh-3rem)]

          w-72

          rounded-3xl


          border
          border-[#e8dcc8]


          bg-[#FAF7F0]


          shadow-[0_25px_70px_-20px_rgba(59,36,18,0.35)]


          transition-transform
          duration-300


          dark:border-slate-800
          dark:bg-slate-950


          ${
            open
            ? "translate-x-0"
            : "-translate-x-[120%]"
          }

        `}

      >





        {/* HEADER */}


        <div

          className="

            flex

            items-center

            justify-between

            border-b

            border-[#e8dcc8]

            px-5

            py-5

            dark:border-slate-800

          "

        >



          <div className="flex items-center gap-3">



            <div

              className="

                flex

                h-10

                w-10

                items-center

                justify-center

                rounded-xl

                bg-[#C9A96E]

                text-[#3B2412]

              "

            >

              <GraduationCap size={20}/>


            </div>





            <div>


              <h1

                className="

                  text-base

                  font-black

                  leading-none

                  text-[#3B2412]

                  dark:text-white

                "

              >

                Luqify


              </h1>



              <p

                className="

                  text-[11px]

                  text-[#C9A96E]

                "

              >

                e-Library


              </p>



            </div>


          </div>





          <button

            type="button"

            onClick={() => setOpen(false)}

            aria-label="Close sidebar"

            className="

              rounded-lg

              p-2

              text-[#3B2412]

              transition

              hover:bg-[#C9A96E]/20

              dark:text-white

            "

          >

            <X size={18}/>


          </button>



        </div>







        {/* MENU */}



        <nav className="space-y-1 p-5">



          {menuItems.map((item)=>{


            const Icon = item.icon;


            const active = pathname === item.href;



            return (


              <Link

                key={item.name}

                href={item.href}

                onClick={() => setOpen(false)}


                className={`


                  flex

                  items-center

                  gap-3


                  rounded-xl


                  px-4

                  py-3


                  text-sm


                  font-medium


                  transition



                  ${

                    active

                    ?

                    "bg-[#3B2412] text-white shadow-md"

                    :

                    `

                    text-[#3B2412]

                    hover:bg-[#C9A96E]/20

                    dark:text-white

                    dark:hover:bg-slate-800

                    `

                  }


                `}


              >


                <Icon size={18}/>


                {item.name}


              </Link>


            );


          })}







          {/* ADMIN */}



          <div

            className="

              mt-6

              border-t

              border-[#e8dcc8]

              pt-5

              dark:border-slate-800

            "

          >



            <Link

              href="/admin"

              onClick={() => setOpen(false)}

              className="

                flex

                items-center

                gap-3

                rounded-xl

                px-4

                py-3

                text-sm

                font-medium

                text-[#3B2412]

                transition

                hover:bg-[#C9A96E]/20

                dark:text-white

                dark:hover:bg-slate-800

              "

            >


              <LayoutDashboard size={18}/>


              Admin Dashboard



            </Link>



          </div>



        </nav>








        {/* FOOTER */}



        <div

          className="

            absolute

            bottom-5

            left-5

            text-[11px]

            text-slate-400

          "

        >

          Luqify e-Library • v1.0


        </div>





      </aside>


    </>
  );
}