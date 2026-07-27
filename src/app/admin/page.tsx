export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  FileText,
  ExternalLink,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import DeleteResourceButton from "@/components/DeleteResourceButton";


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



export default async function AdminPage() {


  const {
    data: resources,
    error,
  } = await supabase
    .from("resources")
    .select("*")
    .order(
      "created_at",
      {
        ascending: false,
      }
    );



  if (error) {

    console.log(
      "ADMIN FETCH ERROR:",
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


        <div
          className="
            mb-10
            rounded-[3rem]
            bg-white
            p-10
            shadow-sm
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
            Luqify e-Library Admin
          </p>


          <h1
            className="
              mt-3
              text-5xl
              font-black
            "
          >
            Dashboard
          </h1>


          <p className="mt-3 text-slate-500">
            Manage uploaded resources.
          </p>


        </div>




        <div
          className="
            mb-10
            rounded-[2rem]
            bg-[#3B2412]
            p-8
            text-white
          "
        >

          <p className="text-sm uppercase opacity-70">
            Total Resources
          </p>


          <h2 className="mt-2 text-5xl font-black">
            {resources?.length ?? 0}
          </h2>


        </div>





        {
          resources && resources.length > 0 ? (

            <div className="grid gap-6">


              {
                resources.map((resource)=>(


                  <div
                    key={resource.id}
                    className="
                      flex
                      flex-col
                      gap-5
                      rounded-3xl
                      bg-white
                      p-6
                      shadow-sm
                      transition
                      hover:-translate-y-1
                      hover:shadow-lg
                      dark:bg-slate-900
                      md:flex-row
                      md:items-center
                      md:justify-between
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
                          dark:bg-slate-800
                        "
                      >

                        <FileText size={28}/>

                      </div>




                      <div>

                        <h3 className="text-lg font-bold">
                          {resource.title}
                        </h3>


                        <p className="text-sm text-slate-500">
                          {resource.file_name}
                        </p>


                        <p className="text-xs text-slate-400">
                          {resource.programme}
                          {" • "}
                          {resource.year}
                        </p>


                        <p className="text-xs text-slate-400">
                          {formatFileSize(resource.file_size)}
                        </p>


                      </div>


                    </div>





                    <div className="flex gap-3">


                      <a
                        href={resource.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#3B2412]
                          px-4
                          py-3
                          text-white
                        "
                      >

                        <ExternalLink size={16}/>

                      </a>




                      <DeleteResourceButton

                        id={resource.id}

                        storagePath={
                          resource.storage_path
                        }

                      />


                    </div>




                  </div>


                ))
              }


            </div>


          ) : (


            <div
              className="
                rounded-3xl
                bg-white
                p-10
                text-center
                text-slate-500
                dark:bg-slate-900
              "
            >

              No resources available.

            </div>


          )
        }



      </section>


    </main>

  );

}