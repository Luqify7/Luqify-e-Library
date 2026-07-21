import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  ChevronRight,
} from "lucide-react";

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

        relative
        overflow-hidden

        rounded-[2.5rem]

        border
        border-[#e8dcc8]

        bg-white

        p-8

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-2
        hover:shadow-xl


        dark:border-slate-700
        dark:bg-slate-900
      "
    >

      {/* Hover Glow */}

      <div
        className="
          absolute
          -right-10
          -top-10

          h-32
          w-32

          rounded-full

          bg-[#C9A96E]/10

          blur-3xl

          transition
          group-hover:bg-[#C9A96E]/20
        "
      />



      {/* Faculty Header */}

      <div className="relative flex items-center gap-5">

        <div
          className="
            flex

            h-16
            w-16

            items-center
            justify-center

            rounded-2xl

            bg-[#3B2412]

            text-white

            transition-all
            duration-300

            group-hover:bg-[#C9A96E]
          "
        >
          <GraduationCap size={30} />
        </div>



        <div>

          <h2
            className="
              text-2xl

              font-bold

              tracking-tight

              text-[#3B2412]

              dark:text-white
            "
          >
            {faculty.name}
          </h2>


          <p
            className="
              mt-1

              text-sm

              text-[#6b5845]

              dark:text-slate-400
            "
          >
            {faculty.programs.length} Programs Available
          </p>


        </div>


      </div>





      {/* Programmes */}

      <div
        className="
          relative

          mt-8

          space-y-3
        "
      >

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

              text-sm

              font-semibold

              text-[#3B2412]

              transition-all
              duration-300

              hover:bg-[#f2eadc]
              hover:translate-x-1


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
          relative

          mt-8

          inline-flex

          items-center

          gap-2

          text-sm

          font-semibold

          text-[#C9A96E]

          transition-all
          duration-300

          hover:gap-4
        "
      >

        <span>
          Browse Faculty
        </span>


        <ChevronRight size={18} />

      </Link>



    </div>
  );
}