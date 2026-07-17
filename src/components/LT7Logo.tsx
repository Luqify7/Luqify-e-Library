import LT7Icon from "@/components/LT7Icon";

export default function LT7Logo() {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center">
        <LT7Icon
          size={48}
          shape="circle"
        />
      </div>


      <div>
        <h1 className="text-2xl font-black">
          LT7
        </h1>

        <p className="text-xs text-slate-400">
          Learn • Think • 7
        </p>
      </div>

    </div>
  );
}