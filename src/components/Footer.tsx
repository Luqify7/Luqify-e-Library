import Link from "next/link";
import { BookOpen, MapPin, Mail, Phone, ShieldCheck } from "lucide-react";

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
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-12
          px-6
          py-16

          md:grid-cols-3
        "
      >
        {/* Brand */}

        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-2xl

                bg-[#C9A96E]

                text-[#3B2412]
              "
            >
              <BookOpen size={26} />
            </div>

            <h2 className="text-3xl font-black">
              Luqify e-Library
            </h2>
          </div>

          <p
            className="
              mt-5
              max-w-sm
              leading-7
              text-[#e8dcc8]
            "
          >
            Knowledge without boundaries. A digital academic library
            designed to help students learn, explore and succeed.
          </p>

          <p
            className="
              mt-5
              text-[#C9A96E]
            "
          >
            Made in Malawi
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
              className="
                text-[#e8dcc8]
                transition
                hover:text-[#C9A96E]
              "
            >
              Home
            </Link>

            <Link
              href="/faculties"
              className="
                text-[#e8dcc8]
                transition
                hover:text-[#C9A96E]
              "
            >
              Faculties
            </Link>

            <Link
              href="/resources"
              className="
                text-[#e8dcc8]
                transition
                hover:text-[#C9A96E]
              "
            >
              Resources
            </Link>

            <Link
              href="/lt7"
              className="
                text-[#e8dcc8]
                transition
                hover:text-[#C9A96E]
              "
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

          <div className="space-y-4">
            <div
              className="
                flex
                items-center
                gap-3

                text-[#e8dcc8]
              "
            >
              <Mail
                size={18}
                className="text-[#C9A96E]"
              />

              <span>
              luqify7@gmail.com
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-3

                text-[#e8dcc8]
              "
            >
              <Phone
                size={18}
                className="text-[#C9A96E]"
              />

              <span>
                +265 880 366 079
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-3

                text-[#e8dcc8]
              "
            >
              <MapPin
                size={18}
                className="text-[#C9A96E]"
              />

              <span>
                MAGU, Malawi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div
        className="
          border-t
          border-[#5a3a22]
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-4

            px-6
            py-6

            text-sm

            text-[#e8dcc8]

            md:flex-row
          "
        >
          <div
            className="
              flex
              items-center
              gap-2

              font-medium

              text-[#C9A96E]
            "
          >
            <ShieldCheck size={18} />

            <span>
              Secured by <strong>Luqify 7</strong>
            </span>
          </div>

          <p>
            © 2026 Luqify e-Library. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}