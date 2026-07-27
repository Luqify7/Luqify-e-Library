"use client";

import {
  Trash2,
  Loader2,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  supabase,
} from "@/lib/supabase";


export default function DeleteResourceButton({
  id,
  storagePath,
}: {
  id: string;
  storagePath?: string | null;
}) {


  const router = useRouter();

  const [loading,setLoading] =
    useState(false);



  async function handleDelete(){


    const confirmDelete =
      window.confirm(
        "Delete this resource permanently?"
      );


    if(!confirmDelete) return;



    setLoading(true);



    try {


      console.log(
        "Deleting ID:",
        id
      );


      /*
        Delete database row first
      */

      const {
        error: databaseError
      } =
      await supabase
        .from("resources")
        .delete()
        .eq(
          "id",
          id
        );


      if(databaseError){

        throw databaseError;

      }



      /*
        Delete storage file after
      */

      if(storagePath){

        const {
          error: storageError
        } =
        await supabase.storage
          .from("resources")
          .remove([
            storagePath
          ]);


        if(storageError){

          console.log(
            "Storage delete warning:",
            storageError.message
          );

        }

      }



      alert(
        "Resource deleted successfully"
      );


      window.location.reload();



    }catch(error:any){


      console.error(
        "DELETE ERROR:",
        error
      );


      alert(
        error.message ||
        "Delete failed"
      );


    }finally{


      setLoading(false);


    }

  }



  return (

    <button

      type="button"

      onClick={handleDelete}

      disabled={loading}

      className="
        flex
        items-center
        justify-center
        rounded-xl
        border
        border-red-300
        px-4
        py-3
        text-red-600
        transition
        hover:bg-red-50
        disabled:opacity-50
      "

    >

      {
        loading ? (

          <Loader2
            size={16}
            className="animate-spin"
          />

        ) : (

          <Trash2 size={16}/>

        )
      }


    </button>

  );

}