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
    },
    {
      name: "Tutorials",
      slug: "tutorials",
      icon: "📝",
    },
    {
      name: "Mid Semester Papers",
      slug: "mid-semester-exams",
      icon: "📄",
    },
    {
      name: "End Semester Papers",
      slug: "end-semester-exams",
      icon: "📚",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">

      <h1 className="text-3xl font-bold capitalize">
        {course.replaceAll("-", " ")}
      </h1>

      <p className="mt-2 text-slate-500">
        Select what you want to study
      </p>


      <div className="mt-8 grid gap-5 md:grid-cols-2">

        {categories.map((category)=>(
          <Link
            key={category.slug}
            href={`/programs/${slug}/${year}/${semester}/${course}/${category.slug}`}
            className="rounded-2xl border p-6 transition hover:bg-slate-50 dark:hover:bg-slate-800"
          >

            <div className="text-3xl">
              {category.icon}
            </div>

            <h2 className="mt-3 text-xl font-semibold">
              {category.name}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              View available resources
            </p>

          </Link>
        ))}

      </div>

    </main>
  );
}