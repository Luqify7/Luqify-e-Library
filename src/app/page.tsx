import { faculties } from "@/data/faculties";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResourceCard from "@/components/ResourceCard";
import FacultyCard from "@/components/FacultyCard";

export default function Home() {
  return (
    <main>

      <Navbar />

      <Hero />


      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">

        <ResourceCard
          icon="📚"
          title="Faculties"
          description="Find faculty information and programs."
        />

        <ResourceCard
          icon="📝"
          title="Notes"
          description="Access learning materials."
        />

        <ResourceCard
          icon="📅"
          title="Timetable"
          description="Track classes and exams."
        />

        <ResourceCard
          icon="📢"
          title="Announcements"
          description="Campus updates."
        />

      </section>



      <section className="mx-auto max-w-7xl px-6 pb-6 pt-2">

        <h2 className="text-4xl font-bold text-slate-900">
          Explore Faculties
        </h2>

        <p className="mt-2 text-slate-500 text-lg">
          Choose a faculty to access programmes, courses and academic resources.
        </p>

      </section>



      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 md:grid-cols-2">

        {faculties.map((faculty) => (
          <FacultyCard
            key={faculty.slug}
            faculty={faculty}
          />
        ))}

      </section>


    </main>
  );
}