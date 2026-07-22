import UploadForm from "@/components/UploadForm";


export default function UploadPage() {


  return (

    <main
      className="
        min-h-screen
        bg-[#FAF7F0]
        px-6
        py-20
        dark:bg-slate-950
      "
    >

      <div
        className="
          mx-auto
          max-w-3xl
        "
      >


        <div
          className="
            mb-10
            text-center
          "
        >

          <h1
            className="
              text-4xl
              font-black
              text-[#3B2412]
              dark:text-white
            "
          >
            Upload Academic Resource
          </h1>


          <p
            className="
              mt-4
              text-[#6b5844]
              dark:text-slate-300
            "
          >
            Share lecture notes, tutorials, past papers and study materials
            with the Luqify student community.
          </p>


        </div>



        <UploadForm />


      </div>


    </main>

  );

}