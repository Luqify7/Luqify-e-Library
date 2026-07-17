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

      <h1 className="text-3xl font-bold capitalize">
        {category.replaceAll("-", " ")}
      </h1>

      <p className="mt-2 text-slate-500">
        {course.replaceAll("-", " ")}
      </p>


      <div className="mt-8 space-y-4">

        {categoryResources.length > 0 ? (

          categoryResources.map((resource) => (

            <a
              key={resource.title}
              href={resource.file}
              target="_blank"
              className="block rounded-2xl border p-5 transition hover:bg-slate-50 dark:hover:bg-slate-800"
            >

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-semibold">
                    📄 {resource.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    PDF Document
                  </p>
                </div>


                <span className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
                  Open
                </span>

              </div>

            </a>

          ))

        ) : (

          <div className="rounded-xl border border-dashed p-5 text-slate-500">
            No resources uploaded yet
          </div>

        )}

      </div>

    </main>
  );
}