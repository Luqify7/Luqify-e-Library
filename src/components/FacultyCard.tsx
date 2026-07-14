import Link from "next/link";

type FacultyCardProps = {
  faculty: {
    name: string;
    slug: string;
    programs: {
      name: string;
      slug: string;
    }[];
  };
};

export default function FacultyCard({ faculty }: FacultyCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl">

      <h2 className="text-2xl font-bold text-slate-900">
        {faculty.name}
      </h2>

      <p className="mt-2 text-slate-500">
        {faculty.programs.length} Programmes Available
      </p>


      <div className="mt-6 space-y-3">

        {faculty.programs.slice(0, 3).map((program) => (

          <div
            key={program.slug}
            className="rounded-lg bg-slate-50 px-4 py-3 text-slate-700"
          >
            {program.name}
          </div>

        ))}


      </div>


      <Link
        href={`/faculties/${faculty.slug}`}
        className="mt-8 inline-block font-semibold text-blue-600 transition group-hover:translate-x-1"
      >
        Open Faculty →
      </Link>


    </div>
  );
}