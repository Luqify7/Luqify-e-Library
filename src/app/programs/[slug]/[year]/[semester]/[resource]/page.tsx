import { faculties } from "@/data/faculties";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{
    slug: string;
    year: string;
    semester: string;
    resource: string;
  }>;
}) {
  const { slug, year, semester, resource } = await params;

  const program = faculties
    .flatMap((faculty) => faculty.programs)
    .find((item) => item.slug === slug);


  if (!program) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">
          Programme Not Found
        </h1>
      </main>
    );
  }


  return (
    <main className="min-h-screen p-10 bg-slate-50">

      <h1 className="text-5xl font-black capitalize text-blue-900">
        {resource.replaceAll("-", " ")}
      </h1>


      <h2 className="text-2xl font-bold mt-4 text-slate-700">
        {program.name}
      </h2>


      <p className="mt-2 text-slate-500 capitalize">
        {year.replace("-", " ")} • {semester.replace("-", " ")}
      </p>


      <div className="mt-10 grid gap-5">

        <div className="p-6 rounded-xl border bg-white hover:shadow-lg transition">

          <h3 className="text-xl font-bold text-slate-800">
            📄 Sample Resource File
          </h3>

          <p className="text-slate-500 mt-2">
            Resource files will appear here.
          </p>

        </div>


      </div>

    </main>
  );
}