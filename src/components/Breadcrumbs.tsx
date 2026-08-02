"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type BreadcrumbItem = {
  name: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({
  items,
}: BreadcrumbsProps) {
  return (
    <nav
      className="
        mb-8
        flex
        flex-wrap
        items-center
        gap-2
        text-sm
        text-[#6b5844]
        dark:text-slate-400
      "
    >

      <Link
        href="/"
        aria-label="Go home"
        className="
          flex
          items-center
          gap-1
          transition
          hover:text-[#C9A96E]
        "
      >
        <Home size={16} />
        <span>Home</span>
      </Link>


      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.name}-${index}`}
            className="
              flex
              items-center
              gap-2
            "
          >

            <ChevronRight
              size={15}
              className="text-[#C9A96E]"
            />


            {item.href && !isLast ? (

              <Link
                href={item.href}
                className="
                  transition
                  hover:text-[#C9A96E]
                "
              >
                {item.name}
              </Link>

            ) : (

              <span
                className="
                  font-semibold
                  text-[#3B2412]
                  dark:text-white
                "
              >
                {item.name}
              </span>

            )}

          </div>
        );
      })}

    </nav>
  );
}