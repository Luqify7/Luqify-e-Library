"use client";

import { useEffect, useState } from "react";

import {
  FileText,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react";

import DeleteResourceButton from "@/components/DeleteResourceButton";

type Resource = {
  id: string;
  title: string | null;
  file_name: string | null;
  file_url: string | null;
  file_size: number | null;
  programme: string | null;
  year: string | null;
  storage_path: string | null;
  created_at: string | null;
};

function formatFileSize(bytes?: number | null) {
  if (!bytes || bytes <= 0) {
    return "Unknown size";
  }

  const sizes = ["Bytes", "KB", "MB", "GB"];

  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes.length - 1
  );

  return `${(
    bytes / Math.pow(1024, index)
  ).toFixed(1)} ${sizes[index]}`;
}

export default function AdminUploadPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadResources() {
    setLoading(true);
    setError("");

    try {
      /*
       * Supabase is loaded only after the page
       * is running in the browser.
       */
      const { createClient } = await import(
        "@/lib/supabase"
      );

      const supabase = createClient();

      const {
        data,
        error: fetchError,
      } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (fetchError) {
        console.error(
          "ADMIN UPLOAD FETCH ERROR:",
          fetchError
        );

        setResources([]);

        setError(
          fetchError.message ||
            "Unable to load resources."
        );

        return;
      }

      setResources(
        (data ?? []) as Resource[]
      );
    } catch (err) {
      console.error(
        "ADMIN UPLOAD ERROR:",
        err
      );

      setResources([]);

      setError(
        "Something went wrong while loading resources."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadResources();
  }, []);

  return (
    <main
      className="
        min-h-screen
        bg-[#FAF7F0]
        px-4
        py-10
        text-[#3B2412]
        transition-colors
        sm:px-6
        sm:py-16
        dark:bg-slate-950
        dark:text-slate-100
      "
    >
      <section className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div
          className="
            mb-8
            rounded-[2rem]
            bg-white
            p-6
            shadow-sm
            transition-colors
            sm:mb-10
            sm:rounded-[3rem]
            sm:p-10
            dark:border
            dark:border-slate-800
            dark:bg-slate-900
            dark:shadow-black/20
          "
        >
          <p
            className="
              text-sm
              font-bold
              uppercase
              tracking-wider
              text-[#C9A96E]
            "
          >
            Luqify e-Library Admin
          </p>

          <h1
            className="
              mt-3
              text-3xl
              font-black
              text-[#3B2412]
              transition-colors
              sm:text-4xl
              md:text-5xl
              dark:text-white
            "
          >
            Resource Manager
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-600
              dark:text-slate-300
            "
          >
            View and manage uploaded resources.
          </p>
        </div>

        {/* TOTAL RESOURCES */}

        <div
          className="
            mb-8
            rounded-[1.75rem]
            bg-[#3B2412]
            p-6
            text-white
            shadow-sm
            sm:mb-10
            sm:rounded-[2rem]
            sm:p-8
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-white/70
                  sm:text-sm
                "
              >
                Total Resources
              </p>

              <h2 className="mt-2 text-4xl font-black sm:text-5xl">
                {loading ? "—" : resources.length}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => void loadResources()}
              disabled={loading}
              aria-label="Refresh resources"
              title="Refresh resources"
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-white/20
                text-white
                transition
                hover:bg-white/10
                hover:scale-105
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <RefreshCw
                size={20}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
            </button>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div
            className="
              mb-6
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-5
              text-sm
              font-semibold
              text-red-700
              dark:border-red-900/70
              dark:bg-red-950/40
              dark:text-red-300
            "
          >
            {error}
          </div>
        )}

        {/* LOADING */}

        {loading && (
          <div
            className="
              flex
              min-h-[250px]
              items-center
              justify-center
              rounded-3xl
              bg-white
              shadow-sm
              dark:border
              dark:border-slate-800
              dark:bg-slate-900
              dark:shadow-black/20
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
                text-sm
                font-semibold
                text-slate-600
                dark:text-slate-300
              "
            >
              <Loader2
                size={20}
                className="
                  animate-spin
                  text-[#C9A96E]
                "
              />

              Loading resources...
            </div>
          </div>
        )}

        {/* RESOURCES */}

        {!loading && resources.length > 0 && (
          <div className="grid gap-5 sm:gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="
                  flex
                  flex-col
                  gap-5
                  rounded-3xl
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  hover:-translate-y-1
                  hover:shadow-lg
                  sm:p-6
                  dark:border
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:shadow-black/20
                  dark:hover:border-slate-700
                  dark:hover:shadow-black/30
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-4
                    sm:gap-5
                  "
                >
                  {/* FILE ICON */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#FAF7F0]
                      dark:bg-slate-800
                    "
                  >
                    <FileText
                      size={26}
                      className="text-[#C9A96E]"
                    />
                  </div>

                  {/* RESOURCE INFO */}

                  <div className="min-w-0">
                    <h3
                      className="
                        truncate
                        text-base
                        font-bold
                        text-[#3B2412]
                        sm:text-lg
                        dark:text-white
                      "
                    >
                      {resource.title ||
                        "Untitled Resource"}
                    </h3>

                    <p
                      className="
                        truncate
                        text-sm
                        text-slate-600
                        dark:text-slate-300
                      "
                    >
                      {resource.file_name ||
                        "Unknown file"}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {resource.programme ||
                        "Unknown programme"}

                      {" • "}

                      {resource.year ||
                        "Unknown year"}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        font-medium
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {formatFileSize(
                        resource.file_size
                      )}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}

                <div
                  className="
                    flex
                    shrink-0
                    gap-3
                    border-t
                    border-slate-100
                    pt-4
                    dark:border-slate-800
                    md:border-0
                    md:pt-0
                  "
                >
                  {resource.file_url && (
                    <a
                      href={resource.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open resource"
                      title="Open resource"
                      className="
                        flex
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#3B2412]
                        px-4
                        py-3
                        text-white
                        transition
                        hover:bg-[#4d301b]
                        hover:scale-105
                      "
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}

                  <DeleteResourceButton
                    id={resource.id}
                    storagePath={
                      resource.storage_path
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          resources.length === 0 &&
          !error && (
            <div
              className="
                rounded-3xl
                bg-white
                p-10
                text-center
                shadow-sm
                dark:border
                dark:border-slate-800
                dark:bg-slate-900
                dark:shadow-black/20
              "
            >
              <FileText
                size={40}
                className="
                  mx-auto
                  mb-4
                  text-[#C9A96E]
                "
              />

              <h3
                className="
                  text-lg
                  font-bold
                  text-[#3B2412]
                  dark:text-white
                "
              >
                No resources available.
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-600
                  dark:text-slate-300
                "
              >
                Uploaded resources will appear here.
              </p>
            </div>
          )}

      </section>
    </main>
  );
}