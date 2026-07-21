export default function Founder() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">

      <div
        className="
          grid
          items-center
          gap-10

          rounded-[3rem]

          border
          border-[#e8dcc8]

          bg-white

          p-10

          shadow-sm

          md:grid-cols-2

          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        {/* Founder Image */}

        <div className="flex justify-center">

          <div
            className="
              h-[32rem]
              w-full
              max-w-md

              overflow-hidden

              rounded-[3rem]

              border-4
              border-[#C9A96E]
            "
          >

            <img
              src="/images/founder.jpg"
              alt="Luqify Founder"

              className="
                h-full
                w-full

                object-cover

                object-[55%_40%]
              "
            />

          </div>

        </div>



        {/* Founder Details */}

        <div>

          <span
            className="
              rounded-full

              bg-[#FAF7F0]

              px-4
              py-2

              text-sm

              font-semibold

              text-[#C9A96E]

              dark:bg-slate-800
            "
          >
            Developer & Founder
          </span>



          <h2
            className="
              mt-6

              text-4xl

              font-black

              text-[#3B2412]

              dark:text-white
            "
          >
            Building Luqify e-Library
          </h2>




          <p
            className="
              mt-5

              text-lg

              leading-8

              text-[#6b5845]

              dark:text-slate-400
            "
          >
            Creating digital solutions that make academic resources easier
            for students to access, explore and learn from, on & offline.
          </p>




          <p
            className="
              mt-5

              font-bold

              text-[#3B2412]

              dark:text-white
            "
          >
            Luqman Ishmael — Developer & Founder
          </p>


        </div>


      </div>


    </section>
  );
}