import { BookOpen, GraduationCap, FileText, Search } from "lucide-react";

const stats = [
  {
    icon: BookOpen,
    number: "5,000+",
    label: "Learning Resources",
  },
  {
    icon: GraduationCap,
    number: "20+",
    label: "Programmes",
  },
  {
    icon: FileText,
    number: "500+",
    label: "Past Papers",
  },
  {
    icon: Search,
    number: "<1 sec",
    label: "Average Search Time",
  },
];

export default function Stats() {
  return (
    <section className="border-y border-[#e8dcc8] bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="
                group
                rounded-[2rem]
                border
                border-[#e8dcc8]
                bg-[#FAF7F0]
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3B2412] text-white">
                <Icon className="h-7 w-7" />
              </div>

              <h3 className="text-4xl font-bold text-[#3B2412]">
                {item.number}
              </h3>

              <p className="mt-3 text-[#6b5a45]">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}