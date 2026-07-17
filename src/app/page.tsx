import Link from "next/link";
import { faculties } from "@/data/faculties";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResourceCard from "@/components/ResourceCard";
import FacultyCard from "@/components/FacultyCard";
import Founder from "@/components/Founder";
import Footer from "@/components/Footer";
import LT7Icon from "@/components/LT7Icon";


export default function Home() {
  return (
    <>
      <Navbar />


      <main className="min-h-screen bg-[#FAF7F0] text-[#3B2412] dark:bg-slate-950 dark:text-white">


        <Hero />



        {/* Resources */}
        <section className="mx-auto max-w-7xl px-6 py-20">

          <div className="mb-10">

            <h2 className="text-4xl font-black">
              Discover Our Resources
            </h2>

            <p className="mt-3 text-lg text-[#6b5845] dark:text-slate-400">
              Everything you need for your academic journey in one place.
            </p>

          </div>



          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <ResourceCard
              icon="📖"
              title="Lecture Notes"
              description="Access organised learning materials from your courses."
            />


            <ResourceCard
              icon="📝"
              title="Past Papers"
              description="Prepare using previous examination papers."
            />


            <ResourceCard
              icon="✏️"
              title="Tutorials"
              description="Practice questions and academic exercises."
            />


            <ResourceCard
              icon="⚡"
              title="LT7 Assistant"
              description="Generate quizzes and understand difficult topics."
            />

          </div>

        </section>





        {/* Faculties */}
        <section className="mx-auto max-w-7xl px-6 pb-20">


          <h2 className="text-4xl font-black">
            Explore Faculties
          </h2>


          <p className="mt-3 text-lg text-[#6b5845] dark:text-slate-400">
            Choose your faculty and discover programmes, courses and resources.
          </p>



          <div className="mt-10 grid gap-8 md:grid-cols-2">


            {faculties.map((faculty)=>(

              <FacultyCard
                key={faculty.slug}
                faculty={faculty}
              />

            ))}


          </div>


        </section>







        {/* LT7 Banner */}
        <section className="mx-auto max-w-7xl px-6 pb-20">


          <div className="rounded-[3rem] bg-[#3B2412] px-8 py-16 text-center text-white">


            <div className="flex justify-center">

              <LT7Icon
                size={100}
                shape="circle"
              />

            </div>




            <h2 className="mt-5 text-4xl font-black">
              Study Smarter With LT7
            </h2>



            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#e8dcc8]">

              Ask questions, generate quizzes and understand difficult concepts
              with LT7, your personal academic assistant.

            </p>





            <Link
              href="/lt7"
              className="
                mt-8
                inline-block
                rounded-xl
                bg-[#C9A96E]
                px-8
                py-3
                font-bold
                text-[#3B2412]
                transition
                hover:scale-105
              "
            >
              Ask LT7 →
            </Link>


          </div>


        </section>





        <Founder />


      </main>



      <Footer />


    </>
  );
}