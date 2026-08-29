import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhyLuqify from "@/components/WhyLuqify";
import LibraryFlow from "@/components/LibraryFlow";
import FacultyPreview from "@/components/FacultyPreview";
import Founder from "@/components/Founder";
import Footer from "@/components/Footer";
import GoogleClassroomWidget from "@/components/GoogleClassroomWidget";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Stats />

        <WhyLuqify />

        <LibraryFlow />

        <FacultyPreview />

        <Founder />
      </main>

      <Footer />

      {/* FLOATING GOOGLE CLASSROOM WIDGET */}
      <GoogleClassroomWidget />
    </>
  );
}