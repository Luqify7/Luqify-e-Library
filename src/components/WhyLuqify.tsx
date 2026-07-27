"use client";

import {
  BookOpen,
  Search,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";


const features = [
  {
    icon: BookOpen,
    title: "Academic Resources",
    description:
      "Access lecture notes, past exams, tutorials, and study materials organized for students.",
  },

  {
    icon: Search,
    title: "Faster Discovery",
    description:
      "Find the resources you need without searching through scattered platforms and groups.",
  },

  {
    icon: Sparkles,
    title: "LT7 Assistant",
    description:
      "Get academic support with an intelligent study companion designed to help you learn.",
  },
];



export default function WhyLuqify() {


  return (

    <section
      className="
        bg-[#FAF7F0]
        px-6
        py-24
        dark:bg-slate-950
      "
    >


      <div
        className="
          mx-auto
          max-w-7xl
        "
      >





        {/* HEADING */}


        <motion.div

          initial={{
            opacity:0,
            y:40,
          }}

          whileInView={{
            opacity:1,
            y:0,
          }}

          viewport={{
            once:true,
            amount:0.3,
          }}

          transition={{
            duration:0.7,
          }}

          className="
            mx-auto
            max-w-3xl
            text-center
          "

        >


          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-[#C9A96E]
            "
          >
            Why Luqify e-Library
          </p>



          <h2
            className="
              mt-3
              text-4xl
              font-black
              tracking-tight
              text-[#3B2412]
              md:text-5xl
              dark:text-white
            "
          >

            Everything Students Need,

            <span className="block">

              One Academic Space

            </span>

          </h2>




          <p
            className="
              mt-5
              text-lg
              leading-relaxed
              text-[#6b5844]
              dark:text-slate-300
            "
          >

            Luqify e-Library brings academic resources, smart discovery,
            and future learning tools together in one platform.

          </p>



        </motion.div>








        {/* CARDS */}



        <div

          className="
            mt-14
            grid
            gap-8
            md:grid-cols-3
          "

        >



          {features.map((feature,index)=>{


            const Icon = feature.icon;



            return (

              <motion.div


                key={feature.title}


                initial={{
                  opacity:0,
                  y:60,
                }}


                whileInView={{
                  opacity:1,
                  y:0,
                }}


                viewport={{
                  once:true,
                  amount:0.2,
                }}


                transition={{
                  duration:0.6,
                  delay:index * 0.15,
                }}



                whileHover={{
                  y:-12,
                  scale:1.03,
                }}


                className="

                  group

                  rounded-[2rem]

                  border
                  border-[#e8dcc8]

                  bg-white

                  p-8

                  shadow-[0_20px_50px_-20px_rgba(59,36,18,0.15)]

                  transition-all

                  duration-500

                  hover:shadow-[0_35px_70px_-25px_rgba(201,169,110,0.45)]

                  dark:border-slate-800

                  dark:bg-slate-900

                "


              >





                <motion.div


                  whileHover={{
                    rotate:8,
                    scale:1.1,
                  }}


                  className="

                    flex

                    h-14

                    w-14

                    items-center

                    justify-center

                    rounded-2xl

                    bg-[#FAF7F0]

                    text-[#C9A96E]

                    transition

                    dark:bg-slate-800

                  "

                >


                  <Icon size={28}/>


                </motion.div>







                <h3

                  className="

                    mt-6

                    text-xl

                    font-bold

                    text-[#3B2412]

                    transition

                    group-hover:text-[#C9A96E]

                    dark:text-white

                  "

                >

                  {feature.title}


                </h3>







                <p

                  className="

                    mt-3

                    leading-relaxed

                    text-[#6b5844]

                    dark:text-slate-400

                  "

                >

                  {feature.description}


                </p>





              </motion.div>


            );


          })}



        </div>





      </div>



    </section>

  );

}