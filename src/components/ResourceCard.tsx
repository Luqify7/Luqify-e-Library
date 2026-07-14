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
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl">

      <div className="mb-5 text-4xl">
        {icon}
      </div>

      <h3 className="mb-2 text-xl font-bold text-slate-800">
        {title}
      </h3>

      <p className="text-slate-500">
        {description}
      </p>

      <div className="mt-6 font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
        Open →
      </div>

    </div>
  );
}