"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ExternalLink,
  FileText,
  GraduationCap,
  Loader2,
  RefreshCw,
  School,
  Users,
} from "lucide-react";
import Link from "next/link";

type ClassroomMaterial = {
  driveFile?: {
    driveFile?: {
      id?: string;
      title?: string;
      alternateLink?: string;
      thumbnailUrl?: string;
    };
    shareMode?: string;
  };

  youtubeVideo?: {
    id?: string;
    title?: string;
    alternateLink?: string;
  };

  link?: {
    url?: string;
    title?: string;
  };

  form?: {
    formUrl?: string;
    title?: string;
  };
};

type ClassroomCourseWork = {
  courseId?: string;
  id?: string;
  title?: string;
  description?: string;
  state?: string;
  alternateLink?: string;
  creationTime?: string;
  updateTime?: string;
  dueDate?: {
    year?: number;
    month?: number;
    day?: number;
  };
  dueTime?: {
    hours?: number;
    minutes?: number;
  };
  materials?: ClassroomMaterial[];
};

type ClassroomCourseWorkMaterial = {
  courseId?: string;
  id?: string;
  title?: string;
  description?: string;
  state?: string;
  alternateLink?: string;
  creationTime?: string;
  updateTime?: string;
  materials?: ClassroomMaterial[];
};

type ClassroomCourse = {
  id?: string;
  name?: string;
  section?: string;
  description?: string;
  room?: string;
  courseState?: string;
  alternateLink?: string;
  coursework?: ClassroomCourseWork[];
  materials?: ClassroomCourseWorkMaterial[];
};

type ClassroomResponse = {
  connected: boolean;
  courseCount?: number;
  courses?: ClassroomCourse[];
  error?: string;
};

function formatDate(dateString?: string) {
  if (!dateString) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateString));
  } catch {
    return "";
  }
}

function formatDueDate(
  dueDate?: ClassroomCourseWork["dueDate"],
  dueTime?: ClassroomCourseWork["dueTime"]
) {
  if (!dueDate?.year || !dueDate.month || !dueDate.day) {
    return "";
  }

  const date = new Date(
    dueDate.year,
    dueDate.month - 1,
    dueDate.day,
    dueTime?.hours ?? 23,
    dueTime?.minutes ?? 59
  );

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getMaterialTitle(material: ClassroomMaterial) {
  if (material.driveFile?.driveFile?.title) {
    return material.driveFile.driveFile.title;
  }

  if (material.youtubeVideo?.title) {
    return material.youtubeVideo.title;
  }

  if (material.link?.title) {
    return material.link.title;
  }

  if (material.form?.title) {
    return material.form.title;
  }

  return "Classroom material";
}

function getMaterialUrl(material: ClassroomMaterial) {
  if (material.driveFile?.driveFile?.alternateLink) {
    return material.driveFile.driveFile.alternateLink;
  }

  if (material.youtubeVideo?.alternateLink) {
    return material.youtubeVideo.alternateLink;
  }

  if (material.link?.url) {
    return material.link.url;
  }

  if (material.form?.formUrl) {
    return material.form.formUrl;
  }

  return "";
}

function MaterialCard({
  material,
}: {
  material: ClassroomMaterial;
}) {
  const title = getMaterialTitle(material);
  const url = getMaterialUrl(material);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          <FileText size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900 dark:text-white">
            {title}
          </p>

          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Open material
              <ExternalLink size={14} />
            </a>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              No external link available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CourseworkCard({
  coursework,
}: {
  coursework: ClassroomCourseWork;
}) {
  const dueDate = formatDueDate(
    coursework.dueDate,
    coursework.dueTime
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <BookOpen size={19} />
          </div>

          <div className="min-w-0">
            <h4 className="font-semibold text-slate-900 dark:text-white">
              {coursework.title || "Untitled coursework"}
            </h4>

            {coursework.state && (
              <span className="mt-1 inline-block text-xs font-medium uppercase tracking-wide text-slate-500">
                {coursework.state}
              </span>
            )}
          </div>
        </div>

        {coursework.alternateLink && (
          <a
            href={coursework.alternateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            aria-label="Open coursework"
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      {coursework.description && (
        <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
          {coursework.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
        {coursework.creationTime && (
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} />
            Posted {formatDate(coursework.creationTime)}
          </span>
        )}

        {dueDate && (
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} />
            Due {dueDate}
          </span>
        )}
      </div>

      {coursework.materials &&
        coursework.materials.length > 0 && (
          <div className="mt-5 space-y-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Materials
            </p>

            {coursework.materials.map(
              (material, index) => (
                <MaterialCard
                  key={
                    material.driveFile?.driveFile?.id ||
                    material.youtubeVideo?.id ||
                    material.link?.url ||
                    material.form?.formUrl ||
                    index
                  }
                  material={material}
                />
              )
            )}
          </div>
        )}
    </div>
  );
}

function ClassroomMaterialCard({
  material,
}: {
  material: ClassroomCourseWorkMaterial;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
          <FileText size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-slate-900 dark:text-white">
            {material.title || "Untitled material"}
          </h4>

          {material.description && (
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
              {material.description}
            </p>
          )}

          {material.creationTime && (
            <p className="mt-3 text-xs text-slate-500">
              Posted {formatDate(material.creationTime)}
            </p>
          )}
        </div>

        {material.alternateLink && (
          <a
            href={material.alternateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            aria-label="Open material"
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      {material.materials &&
        material.materials.length > 0 && (
          <div className="mt-5 space-y-3">
            {material.materials.map(
              (item, index) => (
                <MaterialCard
                  key={
                    item.driveFile?.driveFile?.id ||
                    item.youtubeVideo?.id ||
                    item.link?.url ||
                    item.form?.formUrl ||
                    index
                  }
                  material={item}
                />
              )
            )}
          </div>
        )}
    </div>
  );
}

export default function ClassroomPage() {
  const [data, setData] =
    useState<ClassroomResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  async function loadClassroom(
    isRefresh = false
  ) {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        "/api/classroom",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result =
        (await response.json()) as ClassroomResponse;

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to load Google Classroom."
        );
      }

      setData(result);
    } catch (err) {
      console.error(
        "CLASSROOM PAGE ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load Google Classroom."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadClassroom();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
          <div className="text-center">
            <Loader2
              className="mx-auto animate-spin text-blue-600"
              size={38}
            />

            <p className="mt-4 font-medium text-slate-700 dark:text-slate-200">
              Loading Google Classroom...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Connecting to your classes and materials.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !data?.connected) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <ArrowLeft size={17} />
            Back to Luqify e-Library
          </Link>

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="px-6 py-12 text-center sm:px-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <School size={30} />
              </div>

              <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Connect Google Classroom
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
                Connect your Google Classroom account to view
                your classes, coursework, assignments and
                learning materials directly inside Luqify
                e-Library.
              </p>

              {error && (
                <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                  {error}
                </div>
              )}

              <a
                href="/api/auth/google"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Connect Google Classroom
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const courses = data.courses || [];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <ArrowLeft size={17} />
            Back to Library
          </Link>

          <button
            type="button"
            onClick={() => loadClassroom(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-700 dark:hover:text-blue-400"
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />
            Refresh
          </button>
        </div>

        {courses.length === 0 ? (
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <School size={26} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              No active classes found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Your Google account is connected, but there are
              currently no active Google Classroom courses
              available to this account.
            </p>

            <button
              type="button"
              onClick={() => loadClassroom(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <RefreshCw size={16} />
              Check Again
            </button>
          </section>
        ) : (
          <div className="mt-6 space-y-6">
            {courses.map((course) => {
              const coursework =
                course.coursework || [];

              const materials =
                course.materials || [];

              return (
                <section
                  key={course.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 dark:border-slate-800 dark:bg-slate-950/50 sm:px-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                          <GraduationCap size={24} />
                        </div>

                        <div className="min-w-0">
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {course.name ||
                              "Unnamed Classroom course"}
                          </h2>

                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                            {course.section && (
                              <span className="rounded-full bg-white px-3 py-1 dark:bg-slate-900">
                                Section: {course.section}
                              </span>
                            )}

                            {course.room && (
                              <span className="rounded-full bg-white px-3 py-1 dark:bg-slate-900">
                                Room: {course.room}
                              </span>
                            )}

                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                              {course.courseState ||
                                "ACTIVE"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {course.alternateLink && (
                        <a
                          href={course.alternateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-700 dark:hover:text-blue-400"
                        >
                          Open Classroom
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>

                    {course.description && (
                      <p className="mt-4 max-w-3xl whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {course.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-8 p-5 sm:p-6">
                    {coursework.length > 0 && (
                      <div>
                        <div className="mb-4 flex items-center gap-2">
                          <BookOpen
                            size={19}
                            className="text-blue-600 dark:text-blue-400"
                          />

                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Coursework
                          </h3>

                          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                            {coursework.length}
                          </span>
                        </div>

                        <div className="grid gap-4">
                          {coursework.map(
                            (item, index) => (
                              <CourseworkCard
                                key={
                                  item.id ||
                                  `${course.id}-coursework-${index}`
                                }
                                coursework={item}
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {materials.length > 0 && (
                      <div>
                        <div className="mb-4 flex items-center gap-2">
                          <FileText
                            size={19}
                            className="text-emerald-600 dark:text-emerald-400"
                          />

                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Class Materials
                          </h3>

                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                            {materials.length}
                          </span>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          {materials.map(
                            (item, index) => (
                              <ClassroomMaterialCard
                                key={
                                  item.id ||
                                  `${course.id}-material-${index}`
                                }
                                material={item}
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {coursework.length === 0 &&
                      materials.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center dark:border-slate-700">
                          <Users
                            size={26}
                            className="mx-auto text-slate-400"
                          />

                          <p className="mt-3 font-medium text-slate-700 dark:text-slate-200">
                            No coursework or materials yet
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            New Classroom activities will
                            appear here automatically.
                          </p>
                        </div>
                      )}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}