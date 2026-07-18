import Link from "next/link";
import { GraduationCap, BookOpen, ChevronRight } from "lucide-react";

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
        hover:-translate-y-1
        hover:shadow-xl

        dark:border-slate-700
        dark:bg-slate-900
      "
    >

      {/* Faculty Header */}
      <div className="flex items-center gap-5">

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-slate-800
            text-white
          "
        >
          <GraduationCap size={30} />
        </div>


        <div>
          <h2
            className="
              text-2xl
              font-black
              text-slate-900
              dark:text-white
            "
          >
            {faculty.name}
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            {faculty.programs.length} Programs Available
          </p>
        </div>

      </div>


      {/* Programme List */}
      <div className="mt-8 space-y-3">

        {faculty.programs.map((program) => (

          <Link
            key={program.slug}
            href={`/programs/${program.slug}`}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              bg-[#FAF7F0]
              px-5
              py-4
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:bg-[#f2eadc]

              dark:bg-slate-800
              dark:text-slate-200
              dark:hover:bg-slate-700
            "
          >

            <div className="flex items-center gap-3">

              <BookOpen size={18} />

              <span>
                {program.name}
              </span>

            </div>


            <ChevronRight size={18} />

          </Link>

        ))}

      </div>


      {/* Faculty Link */}
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
        <span>
          Explore Faculty
        </span>

        <ChevronRight size={18} />

      </Link>

    </div>
  );
}