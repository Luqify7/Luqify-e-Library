import {
  FileText,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import ResourceActions from "@/components/ResourceActions";
import Breadcrumbs from "@/components/Breadcrumbs";
import { programs } from "@/data/programs";


function formatFileSize(bytes?: number) {

  if (!bytes) return "Unknown size";

  const sizes = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];

  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  return `${(
    bytes / Math.pow(1024, index)
  ).toFixed(1)} ${sizes[index]}`;

}



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



  const currentProgram = programs.find(
    (program) => program.slug === slug
  );


  const facultyName = currentProgram?.faculty
    ? currentProgram.faculty
        .replaceAll("-", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "Faculty";


  const programName =
    currentProgram?.name ??
    slug.replaceAll("-", " ");



  const yearName =
    year
      .replaceAll("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());



  const semesterName =
    semester
      .replaceAll("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());



  const courseName =
    course
      .replaceAll("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());



  const categoryName =
    category
      .replaceAll("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());



  const {
    data: filteredResources,
    error,
  } = await supabase
    .from("resources")
    .select("*")
    .ilike("programme", slug)
    .ilike("year", yearName)
    .ilike("semester", semesterName)
    .ilike("course", courseName)
    .ilike("category", categoryName);



  if (error) {
    console.log(
      "RESOURCE FETCH ERROR:",
      error.message
    );
  }



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

        <Breadcrumbs
          items={[
            {
              name: "Faculties",
              href: "/faculties",
            },

            {
              name: facultyName,
              href: `/faculties/${currentProgram?.faculty}`,
            },

            {
              name: programName,
              href: `/programs/${slug}`,
            },

            {
              name: yearName,
              href: `/programs/${slug}/${year}`,
            },

            {
              name: semesterName,
              href:
                `/programs/${slug}/${year}/${semester}`,
            },

            {
              name: courseName,
              href:
                `/programs/${slug}/${year}/${semester}/${course}`,
            },

            {
              name: categoryName,
            },

          ]}
        />





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
            {categoryName}
          </h1>



          <p
            className="
              mt-4
              text-[#6b5845]
              dark:text-slate-400
            "
          >
            {filteredResources?.length ?? 0} resources available
          </p>


        </div>






        {/* Resources */}

        <section className="mt-12">


          <div className="grid gap-6">


          {
            filteredResources &&
            filteredResources.length > 0 ? (

              filteredResources.map((resource)=>(

                <div
                  key={resource.id}

                  className="
                    flex
                    flex-col
                    gap-5

                    rounded-3xl
                    border
                    border-[#e8dcc8]

                    bg-white

                    p-6

                    shadow-sm

                    transition-all

                    hover:-translate-y-1
                    hover:shadow-lg

                    md:flex-row
                    md:items-center
                    md:justify-between


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

                      <FileText size={28}/>

                    </div>




                    <div>

                      <h2 className="text-lg font-bold">
                        {resource.title}
                      </h2>


                      <p className="mt-1 text-sm text-slate-500">
                        {resource.file_name || "Academic Material"}
                      </p>


                      <p className="mt-1 text-xs text-slate-400">
                        {formatFileSize(resource.file_size)}
                      </p>


                    </div>


                  </div>




                  <ResourceActions
                    fileUrl={resource.file_url}
                    fileName={resource.file_name}
                  />


                </div>

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

            )

          }


          </div>


        </section>


      </section>


    </main>

  );
}