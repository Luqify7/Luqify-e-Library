import {
  FileText,
  Download,
  ChevronRight,
  Home,
} from "lucide-react";

import { resources } from "@/data/resources";


export default async function ResourceCategoryPage({
  params,
}: {
  params: Promise<{
    slug: string;
    year: string;
    semester: string;
    course: string;
    category: string;
  }>;
}) {

  const {
    slug,
    year,
    semester,
    course,
    category,
  } = await params;


  const filteredResources = resources.filter(
    (resource) =>
      resource.program === slug &&
      resource.year === year &&
      resource.semester === semester &&
      resource.course === course &&
      resource.category === category
  );


  return (
    <main
      className="
        min-h-screen
        bg-[#FAF7F0]
        px-6
        py-16
        text-[#3B2412]

        dark:bg-slate-950
        dark:text-white
      "
    >

      <section className="mx-auto max-w-7xl">


        {/* Breadcrumb */}

        <div
          className="
            mb-10
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-[#6b5845]

            dark:text-slate-400
          "
        >

          <Home size={16} />

          <span>Home</span>

          <ChevronRight size={16} />

          <span>Resources</span>

          <ChevronRight size={16} />

          <span className="capitalize text-[#C9A96E]">
            {category.replaceAll("-", " ")}
          </span>

        </div>



        {/* Header */}

        <div
          className="
            rounded-[3rem]
            border
            border-[#e8dcc8]
            bg-white
            p-10
            shadow-sm

            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          <p
            className="
              text-sm
              font-bold
              uppercase
              tracking-wider
              text-[#C9A96E]
            "
          >
            Resource Library
          </p>


          <h1
            className="
              mt-3
              text-4xl
              font-black
              capitalize

              md:text-6xl
            "
          >
            {category.replaceAll("-", " ")}
          </h1>


          <p
            className="
              mt-4
              text-[#6b5845]

              dark:text-slate-400
            "
          >
            {filteredResources.length} resources available
          </p>

        </div>




        {/* Resources */}

        <section className="mt-12">

          <div className="grid gap-6">


            {filteredResources.length > 0 ? (

              filteredResources.map((resource) => (

                <a
                  key={`${resource.title}-${resource.file}`}
                  href={resource.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex
                    items-center
                    justify-between

                    rounded-3xl

                    border
                    border-[#e8dcc8]

                    bg-white

                    p-6

                    shadow-sm

                    transition-all

                    hover:-translate-y-1
                    hover:shadow-lg

                    dark:border-slate-700
                    dark:bg-slate-900
                  "
                >


                  <div
                    className="
                      flex
                      items-center
                      gap-5
                    "
                  >

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center

                        rounded-2xl

                        bg-[#FAF7F0]

                        text-[#3B2412]

                        dark:bg-slate-800
                        dark:text-white
                      "
                    >

                      <FileText size={28} />

                    </div>



                    <div>

                      <h2
                        className="
                          text-lg
                          font-bold
                        "
                      >
                        {resource.title}
                      </h2>


                      <p
                        className="
                          mt-1
                          text-sm
                          text-slate-500
                        "
                      >
                        Academic Material
                      </p>

                    </div>


                  </div>



                  <Download
                    size={22}
                    className="
                      text-[#C9A96E]
                      transition
                      group-hover:scale-110
                    "
                  />


                </a>

              ))

            ) : (

              <div
                className="
                  rounded-[2rem]
                  border
                  border-[#e8dcc8]
                  bg-white
                  p-8
                  text-slate-500

                  dark:border-slate-700
                  dark:bg-slate-900
                "
              >
                No resources uploaded yet
              </div>

            )}


          </div>

        </section>


      </section>

    </main>
  );
}