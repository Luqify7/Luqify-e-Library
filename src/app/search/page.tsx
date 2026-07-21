import Link from "next/link";
import { Search, BookOpen, FileText, GraduationCap } from "lucide-react";

import { faculties } from "@/data/faculties";
import { courses } from "@/data/courses";
import { resources } from "@/data/resources";


export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {

  const { q } = await searchParams;

  const query = q?.toLowerCase().trim() || "";


  const facultyResults = faculties.filter((faculty) =>
    faculty.name.toLowerCase().includes(query)
  );


  const programResults = faculties
    .flatMap((faculty) => faculty.programs)
    .filter((program) =>
      program.name.toLowerCase().includes(query)
    );


  const courseResults = courses.filter((course) =>
    course.name.toLowerCase().includes(query)
  );


  const resourceResults = resources.filter((resource) =>
    resource.title.toLowerCase().includes(query)
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

      <section className="mx-auto max-w-5xl">


        <h1 className="text-4xl font-black md:text-5xl">
          Search Luqify e-Library
        </h1>


        <p className="mt-3 text-[#6b5845] dark:text-slate-400">
          Find courses, lecture notes, tutorials and academic resources.
        </p>


        <div className="mt-10">
          <form
            action="/search"
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-[#e8dcc8]
              bg-white
              px-5
              py-4
              dark:border-slate-700
              dark:bg-slate-900
            "
          >

            <Search
              size={22}
              className="text-[#C9A96E]"
            />


            <input
              name="q"
              defaultValue={q}
              placeholder="Search lecture notes, tutorials, exams..."
              className="
                w-full
                bg-transparent
                outline-none
                text-[#3B2412]
                dark:text-white
              "
            />


            <button
              className="
                rounded-xl
                bg-[#3B2412]
                px-5
                py-2
                font-semibold
                text-white
                hover:bg-[#C9A96E]
              "
            >
              Search
            </button>

          </form>
        </div>



        {query && (

          <div className="mt-12 space-y-10">


            {/* Faculties */}

            {facultyResults.length > 0 && (
              <ResultSection
                title="Faculties"
                icon={<GraduationCap size={22}/>}
              >

                {facultyResults.map((faculty)=>(
                  <Link
                    key={faculty.slug}
                    href={`/faculties/${faculty.slug}`}
                    className="result-card"
                  >
                    {faculty.name}
                  </Link>
                ))}

              </ResultSection>
            )}





            {/* Programmes */}

            {programResults.length > 0 && (
              <ResultSection
                title="Programmes"
                icon={<GraduationCap size={22}/>}
              >

                {programResults.map((program)=>(
                  <Link
                    key={program.slug}
                    href={`/programs/${program.slug}`}
                    className="result-card"
                  >
                    {program.name}
                  </Link>
                ))}

              </ResultSection>
            )}






            {/* Courses */}

            {courseResults.length > 0 && (
              <ResultSection
                title="Courses"
                icon={<BookOpen size={22}/>}
              >

                {courseResults.map((course)=>(
                  <Link
                    key={course.slug}
                    href={`/programs/${course.program}/${course.year}/${course.semester}/${course.slug}`}
                    className="result-card"
                  >
                    {course.name}
                  </Link>
                ))}

              </ResultSection>
            )}






            {/* Resources */}

            {resourceResults.length > 0 && (
              <ResultSection
                title="Resources"
                icon={<FileText size={22}/>}
              >

                {resourceResults.map((resource)=>(
                  <a
                    key={`${resource.title}-${resource.file}`}
                    href={resource.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="result-card"
                  >
                    {resource.title}
                  </a>
                ))}

              </ResultSection>
            )}




            {facultyResults.length === 0 &&
              programResults.length === 0 &&
              courseResults.length === 0 &&
              resourceResults.length === 0 && (

              <p className="text-slate-500">
                No results found.
              </p>

            )}


          </div>

        )}


      </section>

    </main>
  );
}





function ResultSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-[#C9A96E]">
          {icon}
        </span>

        <h2 className="text-2xl font-black">
          {title}
        </h2>
      </div>


      <div className="grid gap-4">
        {children}
      </div>

    </section>
  );
}