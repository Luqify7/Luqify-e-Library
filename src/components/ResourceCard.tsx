import React from "react";
import Link from "next/link";

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
      <div className="rounded-3xl bg-white p-6 shadow-md transition hover:scale-105 hover:shadow-xl dark:bg-slate-900 cursor-pointer">

        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF7F0] text-[#3B2412] dark:bg-slate-800 dark:text-white">
          {icon}
        </div>

        <h3 className="text-xl font-black">
          {title}
        </h3>

        <p className="mt-3 text-[#6b5845] dark:text-slate-400">
          {description}
        </p>

      </div>
    </Link>
  );
}