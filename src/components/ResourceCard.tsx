import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ResourceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
};

export default function ResourceCard({
  icon,
  title,
  description,
  link,
}: ResourceCardProps) {
  return (
    <Link href={link}>

      <div
        className="
          group

          relative
          overflow-hidden

          rounded-[2rem]

          border
          border-[#e8dcc8]

          bg-white

          p-7

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

            -right-8
            -top-8

            h-28
            w-28

            rounded-full

            bg-[#C9A96E]/10

            blur-3xl

            transition

            group-hover:bg-[#C9A96E]/20
          "
        />



        {/* Icon */}

        <div
          className="
            relative

            flex

            h-14
            w-14

            items-center
            justify-center

            rounded-2xl

            bg-[#FAF7F0]

            text-[#3B2412]

            transition-all
            duration-300

            group-hover:bg-[#C9A96E]
            group-hover:text-white

            dark:bg-slate-800
            dark:text-white
          "
        >
          {icon}
        </div>





        {/* Title */}

        <h3
          className="
            relative

            mt-6

            text-lg

            font-bold

            tracking-tight

            text-[#3B2412]

            dark:text-white
          "
        >
          {title}
        </h3>





        {/* Description */}

        <p
          className="
            relative

            mt-3

            text-sm

            leading-6

            text-[#6b5845]

            dark:text-slate-400
          "
        >
          {description}
        </p>





        {/* Action */}

        <div
          className="
            relative

            mt-6

            flex

            items-center

            gap-2

            text-sm

            font-semibold

            text-[#C9A96E]

            transition-all

            group-hover:gap-3
          "
        >
          Explore

          <ArrowRight size={16} />

        </div>


      </div>

    </Link>
  );
}