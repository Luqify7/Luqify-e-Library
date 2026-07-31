import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

import {
  CalendarDays,
  ChevronRight,
} from "lucide-react";

const semesters = [
  {
    slug: "semester-1",
    name: "Semester 1",
    description: "View all first semester courses.",
  },
  {
    slug: "semester-2",
    name: "Semester 2",
    description: "View all second semester courses.",
  },
];

export default function YearOnePage() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-10">

        <Breadcrumbs
          items={[
            {
              name: "Common Commerce",
              href: "/common-commerce",
            },
            {
              name: "Year 1",
              href: "/common-commerce/year-1",
            },
          ]}
        />

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-stone-900 dark:text-white">
            Common Commerce • Year 1
          </h1>

          <p className="mt-3 max-w-3xl text-stone-600 dark:text-slate-400">
            Select a semester to access lecture notes, tutorials,
            mid-semester examinations and end-of-semester examinations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {semesters.map((semester) => (
            <Link
              key={semester.slug}
              href={`/common-commerce/year-1/${semester.slug}`}
              className="group rounded-3xl border border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-amber-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <CalendarDays className="h-10 w-10 text-amber-600" />
                <ChevronRight className="h-5 w-5 text-stone-400 group-hover:translate-x-1 transition" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-stone-900 dark:text-white">
                {semester.name}
              </h2>

              <p className="mt-3 text-stone-600 dark:text-slate-400">
                {semester.description}
              </p>
            </Link>
          ))}

        </div>

      </section>
    </main>
  );
}