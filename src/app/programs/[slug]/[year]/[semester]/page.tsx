import SearchBar from "@/components/SearchBar";
import { faculties } from "@/data/faculties";
import { resources } from "@/data/resources";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{
    slug: string;
    year: string;
    semester: string;
  }>;
}) {
  const { slug, year, semester } = await params;

  const program = faculties
    .flatMap((faculty) => faculty.programs)
    .find((item) => item.slug === slug);

  if (!program) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">
          Programme Not Found
        </h1>
        import AIStudyCard from "@/components/AIStudyCard";
        <AIStudyCard />
      </main>
    );
  }

  const filteredResources = resources.filter(
    (item) =>
      item.program === slug &&
      item.year === year &&
      item.semester === semester
  );

  return (
    <main className="min-h-screen p-10 bg-slate-50">

      <h1 className="text-5xl font-black capitalize text-blue-900">
        {program.name}
      </h1>

      <div className="mt-8">
        <SearchBar />
      </div>

      <p className="text-slate-500 mt-4 capitalize">
        {year.replace("-", " ")} • {semester.replace("-", " ")}
      </p>


      <div className="mt-10 space-y-5">

        {filteredResources.length === 0 ? (

          <div className="p-6 bg-white border rounded-xl">
            <p className="text-slate-500">
              No resources uploaded yet.
            </p>
          </div>

        ) : (

          filteredResources.map((item) => (
            <div
              key={item.title}
              className="p-6 bg-white border rounded-xl hover:shadow-lg transition"
            >

              <h3 className="text-xl font-bold text-slate-800">
                📄 {item.title}
              </h3>

              <p className="text-sm text-slate-500 capitalize mt-2">
                {item.category.replaceAll("-", " ")}
              </p>

              <a
                href={item.file}
                className="text-blue-600 hover:underline mt-3 inline-block"
              >
                Open Resource →
              </a>

            </div>
          ))

        )}

      </div>

    </main>
  );
}