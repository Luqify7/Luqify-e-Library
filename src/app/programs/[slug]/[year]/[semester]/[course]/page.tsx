import Link from "next/link";
import { resources } from "@/data/resources";

export default async function CoursePage({
  params,
}: {
  params: Promise<{
    slug: string;
    year: string;
    semester: string;
    course: string;
  }>;
}) {

  const { slug, year, semester, course } = await params;


  const categories = [
    {
      name: "Lecture Notes",
      slug: "lecture-notes",
      icon: "📖",
      category: "lecture-notes",
    },
    {
      name: "Tutorials",
      slug: "tutorials",
      icon: "📝",
      category: "tutorials",
    },
    {
      name: "Mid Semester Exam Papers",
      slug: "mid-semester-exams",
      icon: "📄",
      category: "mid-semester-exams",
    },
    {
      name: "End Semester Exam Papers",
      slug: "end-semester-exams",
      icon: "📚",
      category: "end-semester-exams",
    },
  ];



  return (
    <main className="mx-auto max-w-5xl px-6 py-10">


      <h1 className="text-4xl font-black capitalize">
        {course.replaceAll("-", " ")}
      </h1>


      <p className="mt-3 text-slate-500">
        {year.replaceAll("-", " ")} • {semester.replaceAll("-", " ")}
      </p>



      <div className="mt-10 grid gap-6 md:grid-cols-2">


        {categories.map((item)=>{


          const count = resources.filter(
            (resource)=>
              resource.program === slug &&
              resource.year === year &&
              resource.semester === semester &&
              resource.course === course &&
              resource.category === item.category
          ).length;



          return (

            <Link
              key={item.slug}
              href={`/programs/${slug}/${year}/${semester}/${course}/${item.slug}`}
              className="
                rounded-3xl
                border
                bg-white
                p-7
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
                dark:border-slate-800
                dark:bg-slate-900
              "
            >


              <div className="text-4xl">
                {item.icon}
              </div>



              <h2 className="mt-5 text-xl font-black">
                {item.name}
              </h2>



              <p className="mt-2 text-sm text-slate-500">
                {count} resources available
              </p>



            </Link>

          );

        })}


      </div>


    </main>
  );
}