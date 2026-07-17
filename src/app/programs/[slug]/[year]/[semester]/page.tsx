import Link from "next/link";
import { courses } from "@/data/courses";

export default async function SemesterPage({
  params,
}: {
  params: Promise<{
    slug: string;
    year: string;
    semester: string;
  }>;
}) {

  const { slug, year, semester } = await params;

  const semesterCourses = courses.filter(
    (course) =>
      course.program === slug &&
      course.year === year &&
      course.semester === semester
  );


  return (
    <main className="mx-auto max-w-5xl px-6 py-10">

      <h1 className="text-3xl font-bold capitalize">
        {semester.replaceAll("-", " ")}
      </h1>

      <p className="mt-2 text-slate-500">
        Select a course
      </p>


      <div className="mt-8 grid gap-4 md:grid-cols-2">

        {semesterCourses.length > 0 ? (

          semesterCourses.map((course)=>(
            <Link
              key={course.slug}
              href={`/programs/${slug}/${year}/${semester}/${course.slug}`}
              className="rounded-2xl border p-6 transition hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              📚 {course.name}
            </Link>
          ))

        ) : (

          <p className="text-slate-500">
            No courses uploaded yet
          </p>

        )}

      </div>

    </main>
  );
}