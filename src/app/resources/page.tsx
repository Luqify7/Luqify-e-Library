// src/app/resources/page.tsx

import Link from "next/link";

import {
  FileText,
  FileImage,
  FileSpreadsheet,
  FileArchive,
  FileVideo,
  FileAudio,
  File as FileIcon,
  Download,
  ExternalLink,
  CalendarDays,
  FolderOpen,
  Inbox,
  ChevronRight,
  Home,
  Play,
  Headphones,
} from "lucide-react";

import { createServerSupabase } from "@/lib/supabase-server";

interface Resource {
  id: string;
  title: string;
  faculty: string | null;
  programme: string | null;
  year: string | null;
  semester: string | null;
  course: string | null;
  category: string | null;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: string;
  storage_path?: string | null;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

/* =========================================================
   NORMALIZATION
========================================================= */

function normalizeValue(
  value: string | null | undefined
) {
  if (!value) return "";

  return value
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function formatSlug(
  value: string | null | undefined
) {
  if (!value) return "";

  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function matchesValue(
  databaseValue: string | null | undefined,
  urlValue: string | null | undefined
) {
  if (!urlValue) return true;

  return (
    normalizeValue(databaseValue) ===
    normalizeValue(urlValue)
  );
}

/* =========================================================
   FILE HELPERS
========================================================= */

function formatFileSize(bytes: number) {
  if (!bytes || bytes <= 0) return "0 B";

  const units = [
    "B",
    "KB",
    "MB",
    "GB",
    "TB",
  ];

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value =
    bytes / Math.pow(1024, exponent);

  return `${value.toFixed(
    exponent === 0 ? 0 : 1
  )} ${units[exponent]}`;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

/* =========================================================
   FILE EXTENSION
========================================================= */

function getFileExtension(
  fileName: string,
  fileType: string
) {
  const filenameExtension = fileName
    ?.split(".")
    .pop()
    ?.toLowerCase();

  if (
    filenameExtension &&
    filenameExtension !== fileName.toLowerCase()
  ) {
    return filenameExtension;
  }

  const mime = (
    fileType || ""
  ).toLowerCase();

  if (mime === "application/pdf")
    return "pdf";

  if (mime === "application/msword")
    return "doc";

  if (
    mime ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "docx";

  if (
    mime === "application/vnd.ms-powerpoint"
  )
    return "ppt";

  if (
    mime ===
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  )
    return "pptx";

  if (
    mime === "application/vnd.ms-excel"
  )
    return "xls";

  if (
    mime ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
    return "xlsx";

  if (mime === "text/plain")
    return "txt";

  if (
    mime === "application/zip"
  )
    return "zip";

  if (mime.startsWith("image/"))
    return mime.split("/")[1];

  if (mime.startsWith("video/"))
    return mime.split("/")[1];

  if (mime.startsWith("audio/"))
    return mime.split("/")[1];

  return "";
}

/* =========================================================
   FILE TYPE CHECKS
========================================================= */

function isVideo(
  fileName: string,
  fileType: string
) {
  const extension = getFileExtension(
    fileName,
    fileType
  );

  return [
    "mp4",
    "webm",
    "ogg",
    "ogv",
    "mov",
    "m4v",
  ].includes(extension);
}

function isAudio(
  fileName: string,
  fileType: string
) {
  const extension = getFileExtension(
    fileName,
    fileType
  );

  return [
    "mp3",
    "wav",
    "ogg",
    "oga",
    "m4a",
    "aac",
    "flac",
  ].includes(extension);
}

/* =========================================================
   FILE ICON
========================================================= */

function getFileIcon(
  fileName: string,
  fileType: string
) {
  const extension = getFileExtension(
    fileName,
    fileType
  );

  if (
    [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "svg",
    ].includes(extension)
  ) {
    return FileImage;
  }

  if (
    [
      "mp4",
      "webm",
      "ogg",
      "ogv",
      "mov",
      "m4v",
    ].includes(extension)
  ) {
    return FileVideo;
  }

  if (
    [
      "mp3",
      "wav",
      "oga",
      "m4a",
      "aac",
      "flac",
    ].includes(extension)
  ) {
    return FileAudio;
  }

  if (
    [
      "xls",
      "xlsx",
      "csv",
    ].includes(extension)
  ) {
    return FileSpreadsheet;
  }

  if (
    [
      "zip",
      "rar",
      "7z",
      "tar",
      "gz",
    ].includes(extension)
  ) {
    return FileArchive;
  }

  if (
    [
      "pdf",
      "doc",
      "docx",
      "ppt",
      "pptx",
      "txt",
    ].includes(extension)
  ) {
    return FileText;
  }

  return FileIcon;
}

/* =========================================================
   FILE BADGE
========================================================= */

function getBadgeColor(
  fileName: string,
  fileType: string
) {
  const extension = getFileExtension(
    fileName,
    fileType
  );

  if (extension === "pdf") {
    return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
  }

  if (
    ["doc", "docx"].includes(extension)
  ) {
    return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
  }

  if (
    ["ppt", "pptx"].includes(extension)
  ) {
    return "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
  }

  if (
    ["xls", "xlsx", "csv"].includes(extension)
  ) {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
  }

  if (
    [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "svg",
    ].includes(extension)
  ) {
    return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300";
  }

  if (
    [
      "mp4",
      "webm",
      "ogg",
      "ogv",
      "mov",
      "m4v",
    ].includes(extension)
  ) {
    return "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300";
  }

  if (
    [
      "mp3",
      "wav",
      "oga",
      "m4a",
      "aac",
      "flac",
    ].includes(extension)
  ) {
    return "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300";
  }

  if (
    [
      "zip",
      "rar",
      "7z",
      "tar",
      "gz",
    ].includes(extension)
  ) {
    return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
  }

  return "bg-[#FAF7F0] text-[#3B2412] dark:bg-slate-800 dark:text-slate-200";
}

/* =========================================================
   BREADCRUMBS
========================================================= */

function Breadcrumbs({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="
        mb-10
        flex
        flex-wrap
        items-center
        gap-2
        text-sm
        text-[#6b5845]
        dark:text-slate-400
      "
    >
      <Link
        href="/"
        className="
          flex
          items-center
          gap-1
          transition-colors
          hover:text-[#C9A96E]
        "
      >
        <Home size={16} />
        Home
      </Link>

      {items.map((item, index) => {
        const isLast =
          index === items.length - 1;

        return (
          <span
            key={`${item.label}-${index}`}
            className="
              flex
              items-center
              gap-2
            "
          >
            <ChevronRight size={16} />

            {isLast || !item.href ? (
              <span
                className="
                  capitalize
                  text-[#C9A96E]
                "
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="
                  capitalize
                  transition-colors
                  hover:text-[#C9A96E]
                "
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{
    faculty?: string;
    programme?: string;
    year?: string;
    semester?: string;
    course?: string;
    category?: string;
  }>;
}) {
  const supabase =
    await createServerSupabase();

  const {
    faculty,
    programme,
    year,
    semester,
    course,
    category,
  } = await searchParams;

  /* =======================================================
     FETCH RESOURCES
  ======================================================= */

  const {
    data,
    error,
  } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  const allResources: Resource[] =
    error || !data
      ? []
      : (data as Resource[]);

  /* =======================================================
     FILTER
  ======================================================= */

  const resources =
    allResources.filter(
      (resource) => {
        const facultyMatch =
          !faculty ||
          matchesValue(
            resource.faculty,
            faculty
          );

        const programmeMatch =
          !programme ||
          matchesValue(
            resource.programme,
            programme
          );

        const yearMatch =
          !year ||
          matchesValue(
            resource.year,
            year
          );

        const semesterMatch =
          !semester ||
          matchesValue(
            resource.semester,
            semester
          );

        const courseMatch =
          !course ||
          matchesValue(
            resource.course,
            course
          );

        const categoryMatch =
          !category ||
          matchesValue(
            resource.category,
            category
          );

        return (
          facultyMatch &&
          programmeMatch &&
          yearMatch &&
          semesterMatch &&
          courseMatch &&
          categoryMatch
        );
      }
    );

  /* =======================================================
     BREADCRUMBS
  ======================================================= */

  const breadcrumbItems: BreadcrumbItem[] =
    [];

  if (faculty) {
    breadcrumbItems.push({
      label: formatSlug(faculty),
    });
  }

  if (programme) {
    breadcrumbItems.push({
      label: formatSlug(programme),
    });
  }

  if (year) {
    breadcrumbItems.push({
      label: formatSlug(year),
    });
  }

  if (semester) {
    breadcrumbItems.push({
      label: formatSlug(semester),
    });
  }

  if (course) {
    breadcrumbItems.push({
      label: formatSlug(course),
    });
  }

  if (category) {
    breadcrumbItems.push({
      label: formatSlug(category),
    });
  }

  const pageTitle =
    category
      ? formatSlug(category)
      : course
      ? formatSlug(course)
      : semester
      ? formatSlug(semester)
      : year
      ? formatSlug(year)
      : programme
      ? formatSlug(programme)
      : "Resources";

  const activeFilters = [
    faculty,
    programme,
    year,
    semester,
    course,
    category,
  ]
    .filter(Boolean)
    .map((item) =>
      formatSlug(item)
    );

  /* =======================================================
     UI
  ======================================================= */

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

        <Breadcrumbs
          items={breadcrumbItems}
        />

        {/* HEADER */}

        <div
          className="
            rounded-3xl
            border
            border-[#e8dcc8]
            bg-white
            p-10
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div
            className="
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div
              className="
                flex
                items-center
                gap-6
              "
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center
                  rounded-3xl
                  bg-[#3B2412]
                  text-white
                "
              >
                <FolderOpen size={38} />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#C9A96E]
                  "
                >
                  Resource Library
                </p>

                <h1
                  className="
                    mt-2
                    text-4xl
                    font-black
                    capitalize
                    leading-tight
                    md:text-6xl
                  "
                >
                  {pageTitle}
                </h1>

                {activeFilters.length >
                  0 && (
                  <div
                    className="
                      mt-4
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {activeFilters.map(
                      (
                        filter,
                        index
                      ) => (
                        <span
                          key={`${filter}-${index}`}
                          className="
                            rounded-full
                            border
                            border-[#e8dcc8]
                            bg-[#FAF7F0]
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            capitalize
                            text-[#6b5845]
                            dark:border-slate-700
                            dark:bg-slate-800
                            dark:text-slate-300
                          "
                        >
                          {filter}
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-[#e8dcc8]
                bg-[#FAF7F0]
                px-6
                py-4
                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              <FileText
                size={22}
                className="text-[#C9A96E]"
              />

              <div>
                <p
                  className="
                    text-2xl
                    font-black
                    leading-none
                  "
                >
                  {resources.length}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#6b5845]
                    dark:text-slate-400
                  "
                >
                  {resources.length ===
                  1
                    ? "Resource"
                    : "Resources"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RESOURCE GRID */}

        <div className="mt-14">

          {resources.length === 0 ? (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-dashed
                border-[#e8dcc8]
                bg-white
                px-8
                py-24
                text-center
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                  bg-[#FAF7F0]
                  text-[#C9A96E]
                  dark:bg-slate-800
                "
              >
                <Inbox size={36} />
              </div>

              <h2
                className="
                  mt-8
                  text-3xl
                  font-black
                "
              >
                No Resources Found
              </h2>

              <p
                className="
                  mt-3
                  max-w-md
                  leading-7
                  text-[#6b5845]
                  dark:text-slate-400
                "
              >
                There are currently no
                resources available for
                this selection. Please
                check another course or
                category.
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                gap-8
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {resources.map(
                (resource) => {
                  const FileTypeIcon =
                    getFileIcon(
                      resource.file_name,
                      resource.file_type
                    );

                  const badgeColor =
                    getBadgeColor(
                      resource.file_name,
                      resource.file_type
                    );

                  const extension =
                    getFileExtension(
                      resource.file_name,
                      resource.file_type
                    );

                  const video =
                    isVideo(
                      resource.file_name,
                      resource.file_type
                    );

                  const audio =
                    isAudio(
                      resource.file_name,
                      resource.file_type
                    );

                  return (
                    <div
                      key={resource.id}
                      className="
                        group
                        flex
                        flex-col
                        rounded-3xl
                        border
                        border-[#e8dcc8]
                        bg-white
                        p-8
                        shadow-sm
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:shadow-xl
                        dark:border-slate-700
                        dark:bg-slate-900
                      "
                    >

                      {/* FILE HEADER */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >
                        <div
                          className="
                            flex
                            h-16
                            w-16
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-[#FAF7F0]
                            text-[#3B2412]
                            dark:bg-slate-800
                            dark:text-white
                          "
                        >
                          <FileTypeIcon
                            size={28}
                          />
                        </div>

                        <span
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-bold
                            uppercase
                            tracking-wider
                            ${badgeColor}
                          `}
                        >
                          {extension ||
                            "FILE"}
                        </span>
                      </div>

                      {/* TITLE */}

                      <h3
                        className="
                          mt-6
                          line-clamp-2
                          text-2xl
                          font-black
                          leading-tight
                        "
                      >
                        {resource.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          truncate
                          text-sm
                          text-[#6b5845]
                          dark:text-slate-400
                        "
                      >
                        {resource.file_name}
                      </p>

                      {/* VIDEO PREVIEW */}

                      {video && (
                        <div
                          className="
                            mt-6
                            overflow-hidden
                            rounded-2xl
                            bg-black
                          "
                        >
                          <video
                            controls
                            preload="metadata"
                            playsInline
                            className="
                              aspect-video
                              w-full
                            "
                          >
                            <source
                              src={
                                resource.file_url
                              }
                              type={
                                resource.file_type ||
                                undefined
                              }
                            />

                            Your browser does not
                            support video playback.
                          </video>
                        </div>
                      )}

                      {/* AUDIO PREVIEW */}

                      {audio && (
                        <div
                          className="
                            mt-6
                            rounded-2xl
                            border
                            border-[#e8dcc8]
                            bg-[#FAF7F0]
                            p-5
                            dark:border-slate-700
                            dark:bg-slate-800
                          "
                        >
                          <div
                            className="
                              mb-3
                              flex
                              items-center
                              gap-2
                              text-sm
                              font-bold
                              text-[#3B2412]
                              dark:text-white
                            "
                          >
                            <Headphones
                              size={18}
                              className="text-[#C9A96E]"
                            />

                            Audio Tutorial
                          </div>

                          <audio
                            controls
                            preload="metadata"
                            className="w-full"
                          >
                            <source
                              src={
                                resource.file_url
                              }
                              type={
                                resource.file_type ||
                                undefined
                              }
                            />

                            Your browser does not
                            support audio playback.
                          </audio>
                        </div>
                      )}

                      {/* RESOURCE INFO */}

                      <div
                        className="
                          mt-4
                          flex
                          flex-wrap
                          items-center
                          gap-4
                          text-xs
                          font-semibold
                          text-[#6b5845]
                          dark:text-slate-400
                        "
                      >
                        <span
                          className="
                            flex
                            items-center
                            gap-1
                          "
                        >
                          <FileIcon
                            size={14}
                          />

                          {formatFileSize(
                            resource.file_size
                          )}
                        </span>

                        <span
                          className="
                            flex
                            items-center
                            gap-1
                          "
                        >
                          <CalendarDays
                            size={14}
                          />

                          {formatDate(
                            resource.created_at
                          )}
                        </span>
                      </div>

                      {/* COURSE */}

                      {resource.course && (
                        <div
                          className="
                            mt-5
                            rounded-xl
                            bg-[#FAF7F0]
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-[#6b5845]
                            dark:bg-slate-800
                            dark:text-slate-300
                          "
                        >
                          Course:{" "}
                          {resource.course}
                        </div>
                      )}

                      {/* ACTIONS */}

                      <div
                        className="
                          mt-8
                          flex
                          items-center
                          gap-3
                        "
                      >

                        {/* PLAY / OPEN */}

                        <a
                          href={
                            resource.file_url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            bg-[#3B2412]
                            px-5
                            py-3
                            text-sm
                            font-bold
                            text-white
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:bg-[#2a1a0d]
                          "
                        >
                          {video ? (
                            <Play size={16} />
                          ) : audio ? (
                            <Headphones
                              size={16}
                            />
                          ) : (
                            <ExternalLink
                              size={16}
                            />
                          )}

                          {video
                            ? "Play"
                            : audio
                            ? "Listen"
                            : "Open"}
                        </a>

                        {/* DOWNLOAD */}

                        <a
                          href={
                            resource.file_url
                          }
                          download={
                            resource.file_name
                          }
                          className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            border
                            border-[#e8dcc8]
                            bg-[#FAF7F0]
                            px-5
                            py-3
                            text-sm
                            font-bold
                            text-[#3B2412]
                            transition-all
                            duration-300
                            hover:border-[#C9A96E]
                            hover:text-[#C9A96E]
                            dark:border-slate-700
                            dark:bg-slate-800
                            dark:text-white
                          "
                        >
                          <Download
                            size={16}
                          />

                          Download
                        </a>
                      </div>

                    </div>
                  );
                }
              )}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}