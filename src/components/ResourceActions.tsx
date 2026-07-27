"use client";

import {
  Download,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { useState } from "react";

import { supabase } from "@/lib/supabase";


export default function ResourceActions({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName?: string;
}) {


  const [downloading, setDownloading] = useState(false);



  async function handleDownload() {

    try {

      setDownloading(true);


      const path =
        fileUrl.split("/resources/")[1];


      if (!path) {
        throw new Error("Invalid file path");
      }



      const {
        data,
        error,
      } =
        await supabase.storage
          .from("resources")
          .download(path);



      if (error) {
        throw error;
      }



      const url =
        window.URL.createObjectURL(data);



      const link =
        document.createElement("a");



      link.href = url;


      link.download =
        fileName || "Luqify-resource";



      document.body.appendChild(link);


      link.click();


      link.remove();



      window.URL.revokeObjectURL(url);



    } catch(error:any) {


      console.error(
        "DOWNLOAD ERROR:",
        error
      );


      alert(
        error.message ||
        "Download failed"
      );


    } finally {

      setDownloading(false);

    }

  }



  return (

    <div
      className="
        flex
        flex-col
        gap-3
        sm:flex-row
      "
    >


      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#3B2412]
          px-5
          py-3
          text-sm
          font-bold
          text-white
          transition
          hover:-translate-y-1
          hover:shadow-md
        "
      >

        <ExternalLink size={16}/>

        Open

      </a>




      <button
        onClick={handleDownload}
        disabled={downloading}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-[#C9A96E]
          px-5
          py-3
          text-sm
          font-bold
          text-[#3B2412]
          transition
          hover:-translate-y-1
          hover:bg-[#FAF7F0]
          disabled:cursor-not-allowed
          disabled:opacity-50
          dark:text-white
        "
      >

        {
          downloading ? (
            <>
              <Loader2
                size={16}
                className="animate-spin"
              />

              Downloading...

            </>
          ) : (
            <>
              <Download size={16}/>

              Download

            </>
          )
        }


      </button>


    </div>

  );

}