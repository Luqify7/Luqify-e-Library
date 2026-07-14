import Link from "next/link";
import Sidebar from "./Sidebar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <div className="flex items-center gap-4">
          <Sidebar />

          <Link href="/" className="text-2xl font-bold tracking-wide">
            Luqify7-e-Library
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/faculties/commerce">Faculties</Link>
          <Link href="/">Notes</Link>
          <Link href="/">About</Link>
        </nav>

      </div>
    </header>
  );
}