"use client";

import Link from "next/link";
import {
  ArrowRight,
  Search,
  Sparkles,
} from "lucide-react";

import { useState } from "react";


export default function Hero() {


  const [leftPaused, setLeftPaused] = useState(false);
  const [rightPaused, setRightPaused] = useState(false);



  const leftImages = [
    "/images/library-hero.jpg",
    "/images/library-1.jpg",
    "/images/campus-1.jpg",
    "/images/library-2.jpg",
    "/images/campus-2.jpg",
    "/images/library-3.jpg",
    "/images/campus-3.jpg",
    "/images/library-4.jpg",
  ];



  const rightImages = [
    "/images/founder.jpg",
    "/images/student-1.jpg",
    "/images/student-2.jpg",
    "/images/student-3.jpg",
    "/images/student-4.jpg",
    "/images/student-5.jpg",
    "/images/student-6.jpg",
    "/images/student-7.jpg",
    "/images/student-8.jpg",
  ];





  return (

    <section
      className="
        relative
        overflow-hidden
        border-b
        border-[#e8dcc8]
        bg-[#FAF7F0]
        px-6
        lg:px-10
        dark:border-slate-800
        dark:bg-slate-950
      "
    >



      {/* GLOW */}

      <div
        className="
          absolute
          -left-32
          top-10
          h-72
          w-72
          rounded-full
          bg-[#C9A96E]/10
          blur-3xl
        "
      />


      <div
        className="
          absolute
          -right-40
          -top-40
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#C9A96E]/20
          blur-3xl
        "
      />






      <div
        className="
          relative
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-20
          lg:grid-cols-2
        "
      >





        {/* CONTENT */}


        <div>


          <div
            className="
              mb-6
              inline-flex
              items-center
              rounded-full
              border
              border-[#e8dcc8]
              bg-white
              px-4
              py-2
              shadow-sm
            "
          >

            <Sparkles
              size={16}
              className="text-[#C9A96E]"
            />

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
            "
          >

            Welcome To


            <span
              className="
                mt-2
                block
                text-[#C9A96E]
              "
            >

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
            "
          >

            Discover lecture notes, tutorials, past papers and academic
            resources from every faculty — all in one modern digital
            library built for university students.

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
              "
            >

              Explore Library

              <ArrowRight size={18}/>

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
              "
            >

              <Search size={18}/>

              Search Resources

            </Link>


          </div>


        </div>









        {/* IMAGE FLOW */}



        <div
          className="
            relative
            flex
            h-[650px]
            justify-center
            gap-5
            overflow-hidden
            px-2
          "
        >





          {/* TOP FADE */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              z-20
              h-20
              bg-gradient-to-b
              from-[#020617]
              via-[#020617]/80
              to-transparent
            "
          />




          {/* BOTTOM FADE */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              z-20
              h-20
              bg-gradient-to-t
              from-[#020617]
              via-[#020617]/80
              to-transparent
            "
          />







          {/* LEFT FLOW */}



          <div
            className="overflow-hidden"
            onMouseEnter={()=>setLeftPaused(true)}
            onMouseLeave={()=>setLeftPaused(false)}
            onTouchStart={()=>setLeftPaused(true)}
            onTouchEnd={()=>setLeftPaused(false)}
          >


            <div
              className={`
                luqify-track-up
                ${leftPaused ? "pause-flow" : ""}
                cursor-grab
                select-none
                active:cursor-grabbing
              `}
            >



              {[...leftImages,...leftImages].map(
                (image,index)=>(

                <div
                  key={index}
                  className="
                    mb-6
                    h-[220px]
                    w-[230px]
                    shrink-0
                    overflow-hidden
                    rounded-[2rem]
                    shadow-2xl
                    transition
                    duration-300
                    hover:scale-105
                  "
                >


                  <img
                    src={image}
                    alt="Luqify library"
                    draggable="false"
                    className="
                      h-full
                      w-full
                      object-cover
                      pointer-events-none
                    "
                  />


                </div>

              ))}


            </div>


          </div>








          {/* RIGHT FLOW */}



          <div
            className="overflow-hidden"
            onMouseEnter={()=>setRightPaused(true)}
            onMouseLeave={()=>setRightPaused(false)}
            onTouchStart={()=>setRightPaused(true)}
            onTouchEnd={()=>setRightPaused(false)}
          >



            <div
              className={`
                luqify-track-down
                ${rightPaused ? "pause-flow" : ""}
                cursor-grab
                select-none
                active:cursor-grabbing
              `}
            >



              {[...rightImages,...rightImages].map(
                (image,index)=>(


                <div
                  key={index}
                  className="
                    mb-6
                    h-[220px]
                    w-[230px]
                    shrink-0
                    overflow-hidden
                    rounded-[2rem]
                    shadow-2xl
                    transition
                    duration-300
                    hover:scale-105
                  "
                >


                  <img
                    src={image}
                    alt="Luqify students"
                    draggable="false"
                    className="
                      h-full
                      w-full
                      object-cover
                      pointer-events-none
                    "
                  />


                </div>


              ))}


            </div>


          </div>






        </div>






      </div>


    </section>

  );
}