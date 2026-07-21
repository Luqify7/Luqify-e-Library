import {
  BookOpen,
  Search,
  Sparkles,
} from "lucide-react";


const features = [
  {
    icon: BookOpen,
    title: "Academic Resources",
    description:
      "Access lecture notes, past exams, tutorials, and study materials organized for students.",
  },

  {
    icon: Search,
    title: "Faster Discovery",
    description:
      "Find the resources you need without searching through scattered platforms and groups.",
  },

  {
    icon: Sparkles,
    title: "LT7 Assistant",
    description:
      "Get academic support with an intelligent study companion designed to help you learn.",
  },
];


export default function WhyLuqify() {
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
            mx-auto
            max-w-3xl
            text-center
          "
        >

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-[#C9A96E]
            "
          >
            Why Luqify e-Library
          </p>


          <h2
            className="
              mt-3
              text-4xl
              font-black
              tracking-tight
              text-[#3B2412]
              md:text-5xl
              dark:text-white
            "
          >
            Everything Students Need,
            <span className="block">
              One Academic Space
            </span>
          </h2>


          <p
            className="
              mt-5
              text-lg
              leading-relaxed
              text-[#6b5844]
              dark:text-slate-300
            "
          >
            Luqify e-Library brings academic resources, smart discovery,
            and future learning tools together in one platform.
          </p>

        </div>



        {/* Cards */}
        <div
          className="
            mt-14
            grid
            gap-8
            md:grid-cols-3
          "
        >

          {features.map((feature) => {

            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  rounded-[2rem]
                  border
                  border-[#e8dcc8]
                  bg-white
                  p-8
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
                  {feature.title}
                </h3>


                <p
                  className="
                    mt-3
                    leading-relaxed
                    text-[#6b5844]
                    dark:text-slate-400
                  "
                >
                  {feature.description}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}