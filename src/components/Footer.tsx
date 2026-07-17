import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-[#e8dcc8]
        bg-[#3B2412]
        text-white
      "
    >

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">


        {/* Brand */}
        <div>

          <h2 className="text-3xl font-black">
            📖 Luqify e-Library
          </h2>


          <p className="mt-5 max-w-sm leading-7 text-[#e8dcc8]">
            Knowledge without boundaries. A digital academic library
            designed to help students learn, explore and succeed.
          </p>


          <p className="mt-5 text-[#C9A96E]">
            Made in Malawi 🇲🇼
          </p>

        </div>




        {/* Links */}
        <div>

          <h3 className="mb-5 text-lg font-bold">
            Explore
          </h3>


          <div className="flex flex-col gap-3">

            <Link
              href="/"
              className="text-[#e8dcc8] transition hover:text-[#C9A96E]"
            >
              Home
            </Link>


            <Link
              href="/faculties/commerce"
              className="text-[#e8dcc8] transition hover:text-[#C9A96E]"
            >
              Faculties
            </Link>


            <Link
              href="/"
              className="text-[#e8dcc8] transition hover:text-[#C9A96E]"
            >
              Resources
            </Link>


            <Link
              href="/"
              className="text-[#e8dcc8] transition hover:text-[#C9A96E]"
            >
              AI Study Assistant
            </Link>

          </div>

        </div>





        {/* Contact */}
        <div>

          <h3 className="mb-5 text-lg font-bold">
            Connect
          </h3>


          <p className="text-[#e8dcc8]">
            support@luqify.com
          </p>


          <p className="mt-3 text-[#e8dcc8]">
            Malawi 🇲🇼
          </p>


        </div>


      </div>





      {/* Bottom */}
      <div
        className="
          border-t
          border-[#5a3a22]
          py-6
          text-center
          text-sm
          text-[#e8dcc8]
        "
      >
        © 2026 Luqify e-Library.
        Knowledge without boundaries.
      </div>


    </footer>
  );
}