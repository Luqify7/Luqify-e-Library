import Link from "next/link";
import {
  BriefcaseBusiness,
  Scale,
  GraduationCap,
  Users,
  ArrowRight,
} from "lucide-react";


const faculties = [
  {
    name: "Business",
    description: "Accounting, management, economics and business studies.",
    icon: BriefcaseBusiness,
  },

  {
    name: "Law",
    description: "Legal studies, principles and academic resources.",
    icon: Scale,
  },

  {
    name: "Education",
    description: "Learning materials for education programmes.",
    icon: GraduationCap,
  },

  {
    name: "Social Sciences",
    description: "Resources across social and human studies.",
    icon: Users,
  },
];


export default function FacultyPreview() {
  return (
    <section
      className="
        bg-[#FAF7F0]
        px-6
        py-24
        dark:bg-slate-950
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
        "
      >

        {/* Heading */}
        <div
          className="
            flex
            flex-col
            justify-between
            gap-6
            md:flex-row
            md:items-end
          "
        >

          <div>

            <p
              className="
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-[#C9A96E]
              "
            >
              Explore Content
            </p>


            <h2
              className="
                mt-3
                text-4xl
                font-black
                text-[#3B2412]
                md:text-5xl
                dark:text-white
              "
            >
              Explore Faculties
            </h2>


            <p
              className="
                mt-4
                max-w-xl
                text-lg
                text-[#6b5844]
                dark:text-slate-300
              "
            >
              Browse academic resources organized according
              to your faculty and programme.
            </p>

          </div>


          <Link
            href="/faculties"
            className="
              group
              flex
              items-center
              gap-2
              font-semibold
              text-[#3B2412]
              dark:text-white
            "
          >

            Explore All Faculties

            <ArrowRight
              size={18}
              className="
                transition
                group-hover:translate-x-1
              "
            />

          </Link>

        </div>



        {/* Faculty Cards */}
        <div
          className="
            mt-12
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {faculties.map((faculty) => {

            const Icon = faculty.icon;

            return (
              <div
                key={faculty.name}
                className="
                  rounded-[2rem]
                  border
                  border-[#e8dcc8]
                  bg-white
                  p-7
                  transition
                  hover:-translate-y-2
                  hover:shadow-xl
                  dark:border-slate-800
                  dark:bg-slate-900
                "
              >

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#FAF7F0]
                    text-[#C9A96E]
                    dark:bg-slate-800
                  "
                >
                  <Icon size={28} />
                </div>


                <h3
                  className="
                    mt-6
                    text-xl
                    font-bold
                    text-[#3B2412]
                    dark:text-white
                  "
                >
                  {faculty.name}
                </h3>


                <p
                  className="
                    mt-3
                    text-sm
                    leading-relaxed
                    text-[#6b5844]
                    dark:text-slate-400
                  "
                >
                  {faculty.description}
                </p>


              </div>
            );

          })}

        </div>


      </div>

    </section>
  );
}