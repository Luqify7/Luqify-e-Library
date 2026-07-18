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
    <main className="mx-auto max-w-5xl px-6 py-10">


      <h1 className="text-3xl font-black capitalize">
        {category.replaceAll("-", " ")}
      </h1>


      <p className="mt-2 text-slate-500">
        Available learning materials
      </p>



      {categoryResources.length > 0 ? (

        <div className="mt-8 grid gap-6 md:grid-cols-2">


          {categoryResources.map((item)=>(

            <div
              key={item.title}
              className="
                rounded-3xl
                border
                bg-white
                p-6
                shadow-sm
                transition
                hover:shadow-lg
                dark:border-slate-800
                dark:bg-slate-900
              "
            >


              <div className="text-4xl">
                📄
              </div>



              <h2 className="mt-4 text-xl font-bold capitalize">
                {item.title}
              </h2>



              <p className="mt-2 text-sm text-slate-500">
                PDF Document
              </p>



              <div className="mt-6 flex gap-3">


                <a
                  href={item.file}
                  target="_blank"
                  className="
                    rounded-xl
                    bg-[#3B2412]
                    px-5
                    py-2
                    font-semibold
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
                    py-2
                    font-semibold
                    text-[#3B2412]
                    transition
                    hover:bg-[#C9A96E]
                    hover:text-white
                  "
                >
                  Download
                </a>


              </div>


            </div>

          ))}


        </div>


      ) : (

        <div className="mt-8 rounded-2xl border border-dashed p-6 text-slate-500">

          📂 No resources uploaded yet

        </div>

      )}


    </main>
  );
}