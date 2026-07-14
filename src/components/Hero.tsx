export default function Hero() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">

        <p className="mb-3 text-blue-400 font-semibold tracking-widest uppercase">
          Welcome to
        </p>

        <h1 className="text-5xl font-black leading-tight md:text-4xl">
          Luqify7-e-Library
        </h1>

        <p className="mt-2 text-xl text-slate-300">
          
        </p>

        <p className="mt-8 max-w-2xl text-slate-400 text-lg">
          Access lecture notes, tutorials, mid-semester papers,
          end-semester papers and academic resources from one place.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 transition">
            Explore Faculties
          </button>

          <button className="rounded-lg border border-slate-500 px-6 py-3 font-semibold hover:bg-slate-800 transition">
            Browse Resources
          </button>
        </div>

      </div>
    </section>
  );
}