"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Upload,
} from "lucide-react";


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
    "/images/student-1.jpg",
    "/images/founder.jpg",
    "/images/student-2.jpg",
    "/images/student-3.jpg",
    "/images/student-4.jpg",
    "/images/student-5.jpg",
    "/images/student-6.jpg",
    "/images/student-7.jpg",
    "/images/student-8.jpg",
    "/images/student-9.jpg",
    "/images/student-10.jpg",
    "/images/student-11.jpg",
    "/images/student-12.jpg",
    "/images/student-13.jpg",
  ];



  const cardShadow =
    "shadow-[0_25px_60px_-15px_rgba(59,36,18,0.25)] hover:shadow-[0_35px_80px_-20px_rgba(201,169,110,0.45)]";



  return (

    <section
      className="
        relative
        overflow-hidden
        border-b
        border-[#e8dcc8]
        bg-[#FAF7F0]
        px-6
        py-20
        lg:px-10
        dark:border-slate-800
        dark:bg-slate-950
      "
    >


      <div
        className="
          absolute
          -left-40
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#C9A96E]/20
          blur-[120px]
        "
      />


      <div
        className="
          absolute
          right-[-200px]
          top-[-100px]
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#C9A96E]/10
          blur-[120px]
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



        {/* TEXT */}


        <div>

          <p
            className="
              mb-5
              text-sm
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#C9A96E]
            "
          >
            Welcome To
          </p>



          <h1
            className="
              max-w-xl
              text-5xl
              font-black
              leading-[1]
              tracking-tight
              text-[#3B2412]
              md:text-7xl
              dark:text-white
            "
          >

            Luqify

            <span
              className="
                block
                text-[#C9A96E]
              "
            >
              e-Library
            </span>

          </h1>



          <p
            className="
              mt-7
              max-w-lg
              text-lg
              leading-relaxed
              text-[#6b5844]
              dark:text-slate-300
            "
          >

            Discover lecture notes, tutorials, past papers and academic
            resources from every faculty — all in one modern digital
            library built for university students.

          </p>




          <div
            className="
              mt-10
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
                rounded-full
                bg-[#3B2412]
                px-7
                py-4
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
              href="/upload"
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-[#d9c7aa]
                bg-white
                px-7
                py-4
                font-semibold
                text-[#3B2412]
                transition
                hover:bg-[#f8f0e3]
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
            >

              <Upload size={18}/>

              Uploads

            </Link>


          </div>


        </div>







        {/* IMAGE COLLAGE */}



        <div
          className="
            relative
            flex
            h-[680px]
            justify-center
            gap-2
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
              h-32
              bg-gradient-to-b
              from-[#FAF7F0]
              via-[#FAF7F0]/80
              to-transparent
              dark:from-slate-950
              dark:via-slate-950/80
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
              h-32
              bg-gradient-to-t
              from-[#FAF7F0]
              via-[#FAF7F0]/80
              to-transparent
              dark:from-slate-950
              dark:via-slate-950/80
            "
          />





          {/* LEFT COLUMN */}



          <div
            className="
              relative
              overflow-hidden
            "
            onMouseEnter={()=>setLeftPaused(true)}
            onMouseLeave={()=>setLeftPaused(false)}
            onTouchStart={()=>setLeftPaused(true)}
            onTouchEnd={()=>setLeftPaused(false)}
          >


            <div
              className={`
                luqify-track-up
                ${leftPaused ? "pause-flow" : ""}
              `}
            >


              {[...leftImages,...leftImages].map((image,index)=>(

                <div
                  key={index}
                  className={`
                    mb-3
                    overflow-hidden
                    transition
                    duration-500
                    hover:scale-[1.02]
                    ${cardShadow}

                    ${
                      index % 3 === 0
                      ?
                      "h-[290px] w-[250px] rounded-[3rem_1rem_3rem_1rem]"
                      :
                      "h-[190px] w-[220px] rounded-[1rem_3rem_1rem_3rem]"
                    }
                  `}
                >

                  <img
                    src={image}
                    alt="library"
                    draggable="false"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                </div>

              ))}


            </div>


          </div>







          {/* RIGHT COLUMN */}



          <div
            className="
              relative
              overflow-hidden
              pt-24
            "
            onMouseEnter={()=>setRightPaused(true)}
            onMouseLeave={()=>setRightPaused(false)}
            onTouchStart={()=>setRightPaused(true)}
            onTouchEnd={()=>setRightPaused(false)}
          >


            <div
              className={`
                luqify-track-down
                ${rightPaused ? "pause-flow" : ""}
              `}
            >


              {[...rightImages,...rightImages].map((image,index)=>(


                <div
                  key={index}
                  className={`
                    mb-3
                    overflow-hidden
                    transition
                    duration-500
                    hover:scale-[1.02]
                    ${cardShadow}

                    ${
                      index % 2 === 0
                      ?
                      "h-[260px] w-[240px] rounded-[3rem_3rem_1rem_3rem]"
                      :
                      "h-[180px] w-[220px] rounded-[1rem_3rem_1rem_3rem]"
                    }
                  `}
                >


                  <img
                    src={image}
                    alt="students"
                    draggable="false"
                    className="
                      h-full
                      w-full
                      object-cover
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