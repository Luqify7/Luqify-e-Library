"use client";

import { useState } from "react";
import Link from "next/link";
import { courses } from "@/data/courses";
import { resources } from "@/data/resources";

export default function SearchBar() {

  const [query, setQuery] = useState("");

  const results = [
    ...courses.map((course) => ({
      title: course.name,
      type: "Course",
      link: `/programs/${course.program}/${course.year}/${course.semester}/${course.slug}`,
    })),

    ...resources.map((resource) => ({
      title: resource.title,
      type: "Resource",
      link: `/programs/${resource.program}/${resource.year}/${resource.semester}/${resource.course}/${resource.category}`,
    })),
  ].filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <div className="relative mx-auto w-full max-w-2xl">


      <div
        className="
          flex
          items-center
          rounded-full
          border
          border-slate-200
          bg-white
          px-6
          py-4
          shadow-sm
          transition
          hover:shadow-md
          focus-within:shadow-lg
          dark:border-slate-700
          dark:bg-slate-900
        "
      >

        <span className="mr-4 text-xl">
          🔍
        </span>


        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            bg-transparent
            text-lg
            outline-none
            dark:text-white
          "
        />

      </div>



      {query && (

        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
            mt-3
            overflow-hidden
            rounded-3xl
            border
            bg-white
            shadow-xl
            dark:border-slate-700
            dark:bg-slate-900
          "
        >

          {results.length > 0 ? (

            results.map((item) => (

              <Link
                key={item.link}
                href={item.link}
                className="
                  block
                  px-6
                  py-4
                  transition
                  hover:bg-slate-100
                  dark:hover:bg-slate-800
                "
              >

                <p className="font-semibold">
                  {item.title}
                </p>

                <p className="text-sm text-slate-500">
                  {item.type}
                </p>

              </Link>

            ))

          ) : (

            <p className="px-6 py-5 text-slate-500">
              No results found
            </p>

          )}

        </div>

      )}

    </div>
  );
}