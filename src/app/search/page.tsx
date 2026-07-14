import { resources } from "@/data/resources";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;

  const query = q?.toLowerCase() || "";

  const results = resources.filter((item) =>
    item.title.toLowerCase().includes(query)
  );

  return (
    <main className="min-h-screen bg-slate-50 p-10">

      <h1 className="text-5xl font-black text-blue-900">
        Search Results
      </h1>

      <p className="mt-3 text-slate-500">
        Showing results for:
        <span className="font-bold">
          {" "}
          {q}
        </span>
      </p>


      <div className="mt-10 space-y-5">

        {results.length === 0 ? (

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-slate-500">
              No resources found.
            </p>
          </div>

        ) : (

          results.map((item) => (

            <div
              key={item.title}
              className="
                bg-white
                p-6
                rounded-2xl
                shadow-md
                hover:shadow-lg
                transition
              "
            >

              <h2 className="text-xl font-bold text-slate-800">
                📄 {item.title}
              </h2>

              <p className="text-sm text-slate-500 mt-2 capitalize">
                {item.category.replaceAll("-", " ")}
              </p>

              <a
                href={item.file}
                className="
                  inline-block
                  mt-4
                  text-blue-600
                  hover:underline
                "
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