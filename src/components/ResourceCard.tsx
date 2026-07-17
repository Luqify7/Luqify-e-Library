type ResourceCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function ResourceCard({
  icon,
  title,
  description,
}: ResourceCardProps) {
  return (
    <div
      className="
        group
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
        hover:border-[#C9A96E]

        dark:border-slate-800
        dark:bg-slate-900
        dark:hover:border-[#C9A96E]
      "
    >

      {/* Icon */}
      <div
        className="
          mb-6
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-[#FAF7F0]
          text-4xl
          transition-all
          duration-300
          group-hover:scale-110

          dark:bg-slate-800
        "
      >
        {icon}
      </div>



      {/* Title */}
      <h3
        className="
          mb-3
          text-xl
          font-black
          text-[#3B2412]

          dark:text-white
        "
      >
        {title}
      </h3>



      {/* Description */}
      <p
        className="
          leading-7
          text-[#6b5845]

          dark:text-slate-400
        "
      >
        {description}
      </p>



      {/* Action */}
      <div
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          font-semibold
          text-[#C9A96E]
          transition-all
          duration-300
          group-hover:gap-4
        "
      >
        Explore →
      </div>


    </div>
  );
}