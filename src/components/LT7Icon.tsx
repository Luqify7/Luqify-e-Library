import Image from "next/image";

export default function LT7Icon() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-slate-200 dark:bg-white dark:ring-slate-700">
      <Image
        src="/images/lt7-icon.png"
        alt="LT7"
        width={40}
        height={40}
        className="object-contain"
        priority
      />
    </div>
  );
}