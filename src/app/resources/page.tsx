// src/app/resources/page.tsx

import Link from "next/link";

import {
  FileText,
  FileImage,
  FileSpreadsheet,
  FileArchive,
  File as FileIcon,
  Download,
  ExternalLink,
  CalendarDays,
  FolderOpen,
  Inbox,
  ChevronRight,
  Home,
} from "lucide-react";

import { createServerSupabase } from "@/lib/supabase-server";


interface Resource {
  id: string;
  title: string;

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
}


interface BreadcrumbItem {
  label: string;
  href?: string;
}



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
    Math.floor(
      Math.log(bytes) / Math.log(1024)
    ),
    units.length - 1
  );


  const value =
    bytes / Math.pow(
      1024,
      exponent
    );


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



function getFileIcon(fileType: string) {
  const type =
    fileType.toLowerCase();


  if (
    [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "svg",
    ].includes(type)
  ) {
    return FileImage;
  }


  if (
    [
      "xls",
      "xlsx",
      "csv",
    ].includes(type)
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
    ].includes(type)
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
    ].includes(type)
  ) {
    return FileText;
  }


  return FileIcon;
}



function getBadgeColor(fileType: string) {
  const type =
    fileType.toLowerCase();


  if (type === "pdf") {
    return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
  }


  if (
    [
      "doc",
      "docx",
    ].includes(type)
  ) {
    return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
  }


  if (
    [
      "ppt",
      "pptx",
    ].includes(type)
  ) {
    return "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
  }


  if (
    [
      "xls",
      "xlsx",
      "csv",
    ].includes(type)
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
    ].includes(type)
  ) {
    return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300";
  }


  if (
    [
      "zip",
      "rar",
      "7z",
      "tar",
      "gz",
    ].includes(type)
  ) {
    return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
  }


  return "bg-[#FAF7F0] text-[#3B2412] dark:bg-slate-800 dark:text-slate-200";
}



// Converts a URL slug (e.g. "cost-accounting-fundamentals" or "year-2")
// into the Title Case format stored in the database (e.g. "Cost Accounting Fundamentals" or "Year 2").
// Numeric segments are preserved as-is; alphabetic segments are capitalized.
function slugToTitleCase(slug: string | undefined): string | undefined {
  if (!slug) return slug;

  return slug
    .split("-")
    .map((word) => {
      if (word.length === 0) return word;

      // Keep purely numeric segments (e.g. "2") unchanged
      if (/^\d+$/.test(word)) {
        return word;
      }

      return (
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
      );
    })
    .join(" ");
}



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

        <Home size={16}/>

        Home

      </Link>



      {
        items.map(
          (item,index)=>{

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

                <ChevronRight size={16}/>


                {
                  isLast || !item.href ? (

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

                  )
                }


              </span>

            );

          }
        )
      }


    </nav>

  );

}
export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{
    programme?: string;
    year?: string;
    semester?: string;
    course?: string;
    category?: string;
  }>;
}) {


  const supabase = await createServerSupabase();


  const {
    programme,
    year,
    semester,
    course,
    category,

  } = await searchParams;


  // Convert URL slugs into the Title Case format stored in the database.
  // The "programme" filter is stored lowercase in the database (e.g. "accounting"),
  // so it is intentionally left unconverted.
  const formattedYear = slugToTitleCase(year);
  const formattedSemester = slugToTitleCase(semester);
  const formattedCourse = slugToTitleCase(course);
  const formattedCategory = slugToTitleCase(category);



  let query = supabase
    .from("resources")
    .select("*")
    .order(
      "created_at",
      {
        ascending: false,
      }
    );



  if (programme) {
    query = query.eq(
      "programme",
      programme
    );
  }


  if (formattedYear) {
    query = query.eq(
      "year",
      formattedYear
    );
  }


  if (formattedSemester) {
    query = query.eq(
      "semester",
      formattedSemester
    );
  }


  if (formattedCourse) {
    query = query.eq(
      "course",
      formattedCourse
    );
  }


  if (formattedCategory) {
    query = query.eq(
      "category",
      formattedCategory
    );
  }



  const {
    data,
    error,

  } = await query;



  console.log(
    "RESOURCES DATA:",
    data
  );


  console.log(
    "RESOURCES ERROR:",
    error
  );



  const resources: Resource[] =
    error || !data
      ? []
      : (data as Resource[]);



  const activeFilters =
    [
      programme,
      year,
      semester,
      course,
      category,

    ]
      .filter(Boolean)
      .map(
        (item) =>
          (item as string)
            .replaceAll(
              "-",
              " "
            )
      );



  const pageTitle =
    category
      ? category.replaceAll(
          "-",
          " "
        )

      : course
      ? course.replaceAll(
          "-",
          " "
        )

      : semester
      ? semester.replaceAll(
          "-",
          " "
        )

      : "Resources";



  const breadcrumbItems: BreadcrumbItem[] =
    activeFilters.map(
      (item) => ({
        label: item,
      })
    );



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


      <section
        className="
          mx-auto

          max-w-7xl
        "
      >



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

                <FolderOpen size={38}/>

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



                {
                  activeFilters.length > 0 && (

                    <div
                      className="
                        mt-4

                        flex

                        flex-wrap

                        gap-2
                      "
                    >

                      {
                        activeFilters.map(
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
                        )
                      }


                    </div>

                  )
                }


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
                  {
                    resources.length === 1
                      ? "Resource"
                      : "Resources"
                  }
                </p>


              </div>


            </div>


          </div>


        </div>



        {/* RESOURCES */}

        <div className="mt-14">


          {
            resources.length === 0 ? (


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

                  <Inbox size={36}/>

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

                  There are currently no resources available for this
                  selection. Please check back later or explore another
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


                {
                  resources.map(
                    (resource) => {


                      const FileTypeIcon =
                        getFileIcon(
                          resource.file_type
                        );


                      const badgeColor =
                        getBadgeColor(
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

                              <FileTypeIcon size={28}/>

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

                              {resource.file_type}

                            </span>


                          </div>




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




                          <div
                            className="
                              mt-4

                              flex

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

                              <FileIcon size={14}/>

                              {
                                formatFileSize(
                                  resource.file_size
                                )
                              }

                            </span>



                            <span
                              className="
                                flex

                                items-center

                                gap-1
                              "
                            >

                              <CalendarDays size={14}/>

                              {
                                formatDate(
                                  resource.created_at
                                )
                              }

                            </span>


                          </div>




                          <div
                            className="
                              mt-8

                              flex

                              items-center

                              gap-3
                            "
                          >



                            <a
                              href={resource.file_url}
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

                                hover:bg-[#2a1a0d]
                              "
                            >

                              <ExternalLink size={16}/>

                              Open

                            </a>




                            <a
                              href={resource.file_url}
                              download={resource.file_name}
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

                              <Download size={16}/>

                              Download

                            </a>



                          </div>



                        </div>

                      );

                    }
                  )
                }


              </div>


            )
          }


        </div>


      </section>


    </main>

  );

}
