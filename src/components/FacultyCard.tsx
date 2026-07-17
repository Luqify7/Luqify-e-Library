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
    <div
      className="
        group
        rounded-[2.5rem]
        border
        border-[#e8dcc8]
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300

        hover:-translate-y-2
        hover:border-[#C9A96E]
        hover:shadow-xl

        dark:border-slate-800
        dark:bg-slate-900
        dark:hover:border-[#C9A96E]
      "
    >

      {/* Faculty Header */}
      <div className="flex items-start justify-between">

        <div>

          <h2
            className="
              text-3xl
              font-black
              text-[#3B2412]

              dark:text-white
            "
          >
            {faculty.name}
          </h2>


          <p
            className="
              mt-3
              text-[#6b5845]

              dark:text-slate-400
            "
          >
            {faculty.programs.length} Programmes Available
          </p>

        </div>


        <div
          className="
            rounded-2xl
            bg-[#FAF7F0]
            p-4
            text-3xl

            dark:bg-slate-800
          "
        >
          🎓
        </div>

      </div>




      {/* Program Shelf */}
      <div className="mt-8 space-y-3">

        {faculty.programs.slice(0, 3).map((program) => (

          <div
            key={program.slug}
            className="
              rounded-2xl
              border
              border-[#e8dcc8]
              bg-[#FAF7F0]
              px-5
              py-4
              text-[#3B2412]

              transition-all

              group-hover:border-[#C9A96E]

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-200
            "
          >

            📖 {program.name}

          </div>

        ))}

      </div>





      {/* Button */}
      <Link
        href={`/faculties/${faculty.slug}`}
        className="
          mt-8
          inline-flex
          items-center
          gap-2
          font-bold
          text-[#C9A96E]

          transition-all
          duration-300

          hover:gap-4
        "
      >
        Explore Faculty →
      </Link>


    </div>
  );
}