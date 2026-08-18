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

export default function AdminPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadResources() {
    setLoading(true);
    setError("");

    try {
      /*
       * IMPORTANT:
       * Supabase is imported only in the browser.
       * This prevents the client from being created
       * during Next.js prerendering.
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
          "ADMIN FETCH ERROR:",
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
        "ADMIN RESOURCES ERROR:",
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
        px-6
        py-16
        text-[#3B2412]
        dark:bg-slate-950
        dark:text-white
      "
    >
      <section className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div
          className="
            mb-10
            rounded-[3rem]
            bg-white
            p-10
            shadow-sm
            dark:bg-slate-900
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
              text-4xl
              font-black
              sm:text-5xl
            "
          >
            Dashboard
          </h1>

          <p
            className="
              mt-3
              text-slate-500
              dark:text-slate-400
            "
          >
            Manage uploaded resources.
          </p>
        </div>

        {/* TOTAL RESOURCES */}

        <div
          className="
            mb-10
            rounded-[2rem]
            bg-[#3B2412]
            p-8
            text-white
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase opacity-70">
                Total Resources
              </p>

              <h2 className="mt-2 text-5xl font-black">
                {loading ? "—" : resources.length}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => void loadResources()}
              disabled={loading}
              aria-label="Refresh resources"
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-white/20
                transition
                hover:bg-white/10
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
              text-red-600
              dark:border-red-900
              dark:bg-red-950/30
              dark:text-red-400
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
              dark:bg-slate-900
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
                text-sm
                font-semibold
                text-slate-500
                dark:text-slate-400
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

        {/* RESOURCE LIST */}

        {!loading && resources.length > 0 && (
          <div className="grid gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="
                  flex
                  flex-col
                  gap-5
                  rounded-3xl
                  bg-white
                  p-6
                  shadow-sm
                  transition
                  hover:-translate-y-1
                  hover:shadow-lg
                  dark:bg-slate-900
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                {/* RESOURCE INFO */}

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-5
                  "
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#FAF7F0]
                      dark:bg-slate-800
                    "
                  >
                    <FileText
                      size={28}
                      className="text-[#C9A96E]"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="
                        truncate
                        text-lg
                        font-bold
                      "
                    >
                      {resource.title ||
                        "Untitled Resource"}
                    </h3>

                    <p
                      className="
                        truncate
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {resource.file_name ||
                        "Unknown file"}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-400
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
                        text-slate-400
                      "
                    >
                      {formatFileSize(
                        resource.file_size
                      )}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="flex shrink-0 gap-3">
                  {resource.file_url && (
                    <a
                      href={resource.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open resource"
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

        {/* EMPTY STATE */}

        {!loading &&
          resources.length === 0 &&
          !error && (
            <div
              className="
                rounded-3xl
                bg-white
                p-10
                text-center
                text-slate-500
                shadow-sm
                dark:bg-slate-900
                dark:text-slate-400
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

              <p className="mt-2 text-sm">
                Uploaded resources will appear here.
              </p>
            </div>
          )}

      </section>
    </main>
  );
}