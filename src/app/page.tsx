export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">
          📚 Luqify e-Library
        </h1>

        <nav className="space-x-6 text-gray-600">
          <a href="#">Home</a>
          <a href="#">Resources</a>
          <a href="#">Upload</a>
          <a href="#">Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center px-6 py-20">
        <h2 className="text-5xl font-bold text-gray-900">
          Your Digital Academic Resource Hub
        </h2>

        <p className="mt-6 text-lg text-gray-600">
          Access notes, past papers, and learning materials from your faculty.
        </p>

        <div className="mt-8">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full max-w-xl rounded-full border px-6 py-4 shadow-sm"
          />
        </div>
      </section>

      {/* Faculties */}
      <section className="px-8 pb-20">
        <h3 className="text-3xl font-bold text-center mb-10">
          Browse Faculties
        </h3>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow">
            <h4 className="text-2xl font-semibold">
              📖 Commerce Faculty
            </h4>

            <p className="mt-3 text-gray-600">
              Accounting, Business, Economics, HRM and more.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow">
            <h4 className="text-2xl font-semibold">
              🎓 Education Faculty
            </h4>

            <p className="mt-3 text-gray-600">
              Teaching resources, notes and past papers.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500">
        © 2026 Luqify e-Library. Learn. Share. Grow.
      </footer>
    </main>
  );
}