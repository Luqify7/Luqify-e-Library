"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Sparkles,
} from "lucide-react";


const cards = [
  {
    image: "/images/campus.jpg",
    title: "Campus Life",
    height: "h-72",
  },
  {
    image: "/images/library.jpg",
    title: "Digital Library",
    height: "h-52",
  },
  {
    image: "/images/books.jpg",
    title: "Academic Resources",
    height: "h-64",
  },
  {
    image: "/images/students.jpg",
    title: "Student Community",
    height: "h-56",
  },
];


export default function CampusShowcase() {

  return (

    <div
      className="
        relative
        mx-auto
        flex
        max-w-xl
        justify-center
        gap-5
        py-10
      "
    >


      {/* LEFT STACK */}

      <div
        className="
          flex
          flex-col
          gap-5
        "
      >

        {cards.slice(0,2).map((card,index)=>(

          <motion.div
            key={card.image}
            initial={{
              opacity:0,
              y:40
            }}
            animate={{
              opacity:1,
              y:0
            }}
            transition={{
              delay:index * 0.15
            }}
            className={`
              relative
              w-40
              overflow-hidden
              rounded-[2rem]
              border
              border-white/40
              shadow-xl
              ${card.height}
            `}
          >

            <Image
              src={card.image}
              alt={card.title}
              fill
              className="
                object-cover
              "
            />


            <div
              className="
                absolute
                inset-x-0
                bottom-0
                bg-gradient-to-t
                from-black/70
                to-transparent
                p-4
              "
            >

              <p
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {card.title}
              </p>

            </div>

          </motion.div>

        ))}


      </div>



      {/* CENTER BRAND CARD */}

      <motion.div
        initial={{
          opacity:0,
          scale:.9
        }}
        animate={{
          opacity:1,
          scale:1
        }}
        transition={{
          delay:.4
        }}
        className="
          absolute
          left-1/2
          top-1/2
          z-20
          -translate-x-1/2
          -translate-y-1/2
          w-44
          rounded-[2rem]
          border
          border-white/50
          bg-white/70
          p-5
          shadow-2xl
          backdrop-blur-xl
          dark:border-slate-700
          dark:bg-slate-900/70
        "
      >

        <div
          className="
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-[#C9A96E]
          "
        >

          <BookOpen
            size={24}
            className="text-[#3B2412]"
          />

        </div>


        <h3
          className="
            font-black
            text-[#3B2412]
            dark:text-white
          "
        >
          Luqify
        </h3>


        <p
          className="
            mt-1
            text-xs
            text-[#6b5844]
            dark:text-slate-400
          "
        >
          e-Library
          Platform
        </p>


        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            text-xs
            font-medium
            text-[#C9A96E]
          "
        >

          <Sparkles size={14}/>

          LT7 Ready

        </div>


      </motion.div>




      {/* RIGHT STACK */}

      <div
        className="
          flex
          flex-col
          gap-5
          pt-16
        "
      >

        {cards.slice(2).map((card,index)=>(


          <motion.div
            key={card.image}
            initial={{
              opacity:0,
              y:40
            }}
            animate={{
              opacity:1,
              y:0
            }}
            transition={{
              delay:.3 + index * .15
            }}
            className={`
              relative
              w-40
              overflow-hidden
              rounded-[2rem]
              border
              border-white/40
              shadow-xl
              ${card.height}
            `}
          >

            <Image
              src={card.image}
              alt={card.title}
              fill
              className="
                object-cover
              "
            />


            <div
              className="
                absolute
                inset-x-0
                bottom-0
                bg-gradient-to-t
                from-black/70
                to-transparent
                p-4
              "
            >

              <p
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {card.title}
              </p>

            </div>


          </motion.div>


        ))}

      </div>



      {/* FLOATING MINI CARD */}

      <motion.div
        animate={{
          y:[0,-8,0]
        }}
        transition={{
          duration:4,
          repeat:Infinity
        }}
        className="
          absolute
          -right-8
          bottom-8
          z-30
          rounded-2xl
          border
          border-white/40
          bg-white/80
          px-4
          py-3
          shadow-xl
          backdrop-blur-xl
          dark:bg-slate-900/80
        "
      >

        <div className="flex items-center gap-2">

          <GraduationCap
            size={18}
            className="text-[#C9A96E]"
          />

          <span
            className="
              text-sm
              font-semibold
              text-[#3B2412]
              dark:text-white
            "
          >
            Student First
          </span>

        </div>

      </motion.div>



    </div>

  );
}