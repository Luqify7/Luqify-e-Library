import { FileText } from "lucide-react";
import { resources } from "@/data/resources";

export default async function CategoryPage({
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

  const { slug, year, semester, course, category } = await params;


  const categoryResources = resources.filter(
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

      <section className="mx-auto max-w-6xl">


        {/* Header */}
        <div className="flex items-center gap-5">


          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-slate-800
              text-white
            "
          >
            <FileText size={30} />
          </div>


          <div>

            <p
              className="
                text-sm
                font-bold
                text-[#C9A96E]
              "
            >
              Resource Library
            </p>


            <h1
              className="
                mt-2
                text-4xl
                font-black
                capitalize
                md:text-5xl
              "
            >
              {category.replaceAll("-", " ")}
            </h1>


            <p
              className="
                mt-3
                text-slate-500
                dark:text-slate-400
              "
            >
              Available learning materials
            </p>


          </div>


        </div>



        {/* Resources */}
        {categoryResources.length > 0 ? (

          <section
            className="
              mt-12
              grid
              gap-8
              md:grid-cols-2
            "
          >

            {categoryResources.map((item) => (

              <div
                key={item.title}
                className="
                  rounded-[2.5rem]
                  border
                  border-[#e8dcc8]
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl

                  dark:border-slate-700
                  dark:bg-slate-900
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



                <h2
                  className="
                    mt-6
                    text-2xl
                    font-black
                    capitalize
                    dark:text-white
                  "
                >
                  {item.title}
                </h2>



                <p
                  className="
                    mt-3
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  PDF Document
                </p>



                <div className="mt-6 flex flex-wrap gap-3">


                  <a
                    href={item.file}
                    target="_blank"
                    className="
                      rounded-xl
                      bg-[#3B2412]
                      px-5
                      py-3
                      font-bold
                      text-white
                      transition
                      hover:bg-[#C9A96E]
                    "
                  >
                    Open PDF
                  </a>



                  <a
                    href={item.file}
                    download
                    className="
                      rounded-xl
                      border
                      border-[#C9A96E]
                      px-5
                      py-3
                      font-bold
                      text-[#3B2412]
                      transition
                      hover:bg-[#C9A96E]
                      hover:text-white

                      dark:text-white
                    "
                  >
                    Download
                  </a>


                </div>


              </div>

            ))}


          </section>


        ) : (


          <div
            className="
              mt-12
              rounded-[2rem]
              border
              border-dashed
              border-[#C9A96E]
              bg-white
              p-8
              text-slate-500

              dark:bg-slate-900
              dark:text-slate-400
            "
          >
            No resources uploaded yet
          </div>


        )}


      </section>


    </main>
  );
}