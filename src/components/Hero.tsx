import Image from "next/image";
import Link from "next/link";
import LT7Icon from "@/components/LT7Icon";


export default function Hero() {
  return (

    <section className="border-b border-[#e8dcc8] bg-[#FAF7F0] dark:border-slate-800 dark:bg-slate-950">


      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">


        <div>


          <span className="rounded-full border border-[#C9A96E] bg-[#fff8ea] px-4 py-2 text-sm font-semibold text-[#3B2412] dark:bg-slate-900 dark:text-[#C9A96E]">

            📖 Welcome to Luqify e-Library

          </span>



          <h1 className="mt-8 text-5xl font-black leading-tight text-[#3B2412] md:text-6xl dark:text-white">

            Your Gateway
            <br />
            To Academic Excellence

          </h1>



          <p className="mt-8 max-w-xl text-lg leading-8 text-[#6b5845] dark:text-slate-400">

            Access lecture notes, tutorials, past papers and academic resources
            from a modern digital library built to support your learning journey.

          </p>



          <div className="mt-10 flex gap-4">


            <Link
              href="/faculties/commerce"
              className="rounded-xl bg-[#3B2412] px-7 py-3 font-semibold text-white"
            >
              Explore Library
            </Link>



            <Link
              href="/"
              className="rounded-xl border border-[#C9A96E] px-7 py-3 font-semibold"
            >
              Browse Resources
            </Link>


          </div>


        </div>





        <div className="relative">


          <div className="absolute -inset-5 rounded-[3rem] bg-[#C9A96E]/20 blur-3xl" />


          <div className="relative overflow-hidden rounded-[3rem] border shadow-xl">


            <img
  src="/images/library-hero.jpg"
  alt="Luqify library"
  className="h-[420px] w-full object-cover"
/>


          </div>


        </div>


      </div>





      <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-4">


        {[
          {
            icon:"🎓",
            title:"Faculties",
            text:"Explore programmes and academic departments."
          },
          {
            icon:"📖",
            title:"Lecture Notes",
            text:"Access organised learning materials."
          },
          {
            icon:"📝",
            title:"Past Papers",
            text:"Prepare using previous examinations."
          },
          {
            icon:"LT7",
            title:"LT7 Assistant",
            text:"Study smarter with intelligent learning tools."
          }

        ].map((item)=>(
          
          <div
          key={item.title}
          className="rounded-[2rem] border bg-white p-6 shadow-sm dark:bg-slate-900"
          >

            <div className="text-4xl">

              {
                item.icon==="LT7"
                ?
                <LT7Icon size={60}/>
                :
                item.icon
              }

            </div>


            <h3 className="mt-4 font-black">
              {item.title}
            </h3>


            <p className="mt-2 text-sm text-slate-500">
              {item.text}
            </p>


          </div>

        ))}


      </div>


    </section>

  );
}