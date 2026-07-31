import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs";

import {
  GraduationCap,
  ChevronRight,
  BookOpen,
  Users,
} from "lucide-react";

import { commonCommerceYears } from "@/data/common-commerce";

export default function CommonCommercePage() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-slate-950">
      <section className="mx-auto max-w-7xl px-6 py-10">

        <Breadcrumbs
          items={[
            {
              name: "Common Commerce Curriculum",
              href: "/common-commerce",
            },
          ]}
        />

        <div className="mb-10">

          <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-4 py-1 text-sm font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            Faculty of Commerce
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
            Common Commerce Curriculum
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-stone-600 dark:text-slate-400">
            Students enrolled in Accountancy, Accounting, Banking &
            Finance, Business Administration, Human Resource
            Management, Marketing, and Monitoring & Evaluation
            complete a common curriculum during their first two years
            before progressing into programme-specific studies.
          </p>

        </div>

        <div className="mb-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center gap-3">

            <Users className="h-6 w-6 text-amber-600" />

            <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
              Shared Programmes
            </h2>

          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {[
              "Bachelor of Accountancy",
              "Bachelor of Accounting",
              "Banking & Finance",
              "Business Administration",
              "Human Resource Management",
              "Marketing",
              "Monitoring & Evaluation",
            ].map((programme) => (
              <div
                key={programme}
                className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {programme}
              </div>
            ))}

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {commonCommerceYears.map((year) => (
            <Link
              key={year.slug}
              href={`/common-commerce/${year.slug}`}
              className="group rounded-3xl border border-stone-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-amber-500"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-500/10">

                  <GraduationCap className="h-7 w-7 text-amber-700 dark:text-amber-300" />

                </div>

                <ChevronRight className="h-5 w-5 text-stone-400 transition-transform group-hover:translate-x-1 dark:text-slate-500" />

              </div>

              <h2 className="mt-6 text-2xl font-bold text-stone-900 dark:text-white">
                {year.name}
              </h2>

              <p className="mt-3 text-stone-600 dark:text-slate-400">
                {year.description}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-amber-700 dark:text-amber-300">

                <BookOpen className="h-4 w-4" />

                <span className="font-medium">
                  View Curriculum
                </span>

              </div>

            </Link>
          ))}

        </div>

      </section>
    </main>
  );
}