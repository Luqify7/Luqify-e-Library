import {
  Building2,
  GraduationCap,
  CalendarDays,
  BookOpen,
  FileText,
  ChevronRight,
} from "lucide-react";


const steps = [
  {
    icon: Building2,
    title: "Faculty",
    description: "Choose your academic faculty.",
    delay: "float-delay-1",
  },
  {
    icon: GraduationCap,
    title: "Programme",
    description: "Select your course programme.",
    delay: "float-delay-2",
  },
  {
    icon: CalendarDays,
    title: "Year & Semester",
    description: "Navigate your academic level.",
    delay: "float-delay-3",
  },
  {
    icon: BookOpen,
    title: "Course",
    description: "Find your specific subject.",
    delay: "float-delay-4",
  },
  {
    icon: FileText,
    title: "Resources",
    description: "Access notes, exams and materials.",
    delay: "float-delay-5",
  },
];


export default function LibraryFlow() {
  return (
    <section
      className="
        bg-white
        px-6
        py-24
        dark:bg-slate-950
      "
    >

      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-3xl text-center">

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-[#C9A96E]
            "
          >
            How Luqify  e-Library Works
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
            Your Academic Journey,
            <span className="block">
              Simplified
            </span>
          </h2>


          <p
            className="
              mt-5
              text-lg
              text-[#6b5844]
              dark:text-slate-300
            "
          >
            Find learning materials through a structured path
            designed around how students study.
          </p>

        </div>



        <div
          className="
            mt-14
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {steps.map((step, index) => {

            const Icon = step.icon;


            return (
              <div
                key={step.title}
                className="
                  library-float
                  relative
                  flex
                  flex-1
                  items-center
                  gap-4
                  rounded-[2rem]
                  border
                  border-[#e8dcc8]
                  bg-white
                  p-6
                  shadow-sm
                  transition
                  hover:-translate-y-2
                  hover:shadow-xl
                  lg:flex-col
                  lg:text-center
                  dark:border-slate-800
                  dark:bg-slate-900
                "
                style={{
                  animationDelay: `${index * 0.8}s`,
                }}
              >

                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#FAF7F0]
                    text-[#C9A96E]
                    dark:bg-slate-800
                  "
                >
                  <Icon size={30} />
                </div>


                <div>

                  <h3
                    className="
                      font-bold
                      text-[#3B2412]
                      dark:text-white
                    "
                  >
                    {step.title}
                  </h3>


                  <p
                    className="
                      mt-1
                      text-sm
                      text-[#6b5844]
                      dark:text-slate-400
                    "
                  >
                    {step.description}
                  </p>

                </div>


                {index !== steps.length - 1 && (
                  <ChevronRight
                    size={22}
                    className="
                      absolute
                      -right-6
                      hidden
                      text-[#C9A96E]
                      lg:block
                    "
                  />
                )}

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}