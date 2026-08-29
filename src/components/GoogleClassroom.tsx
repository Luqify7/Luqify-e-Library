"use client";

import { useEffect, useState } from "react";

type ClassroomMaterial = {
  id?: string;
  title?: string;
  description?: string;
  alternateLink?: string;
  creationTime?: string;
  updateTime?: string;
  materials?: Array<{
    driveFile?: {
      driveFile?: {
        id?: string;
        title?: string;
        alternateLink?: string;
        thumbnailUrl?: string;
      };
      shareMode?: string;
    };
  }>;
};

type ClassroomCoursework = {
  id?: string;
  title?: string;
  description?: string;
  alternateLink?: string;
  state?: string;
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
};

type ClassroomCourse = {
  id: string;
  name: string;
  section: string;
  description: string;
  room: string;
  courseState: string;
  alternateLink: string;
  coursework: ClassroomCoursework[];
  materials: ClassroomMaterial[];
};

type ClassroomResponse = {
  connected: boolean;
  courseCount?: number;
  courses?: ClassroomCourse[];
  error?: string;
};

export default function GoogleClassroom() {
  const [data, setData] =
    useState<ClassroomResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadClassroom = async () => {
    try {
      setLoading(true);
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
        "CLASSROOM UI ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load Google Classroom."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClassroom();
  }, []);

  /*
   * ==================================================
   * LOADING
   * ==================================================
   */

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />

            <div className="space-y-2">
              <div className="h-5 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

              <div className="h-4 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * ==================================================
   * NOT CONNECTED
   * ==================================================
   */

  if (!data || !data.connected) {
    return (
      <section
        id="google-classroom"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="p-8 sm:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                  🏫 Google Classroom
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Bring your classes into Luqify.
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                  Connect your Google Classroom account
                  to view your classes, classwork and
                  learning materials directly through
                  Luqify e-Library.
                </p>
              </div>

              <a
                href="/api/auth/google"
                className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
              >
                🔐 Connect Google Classroom
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * ==================================================
   * CONNECTED
   * ==================================================
   */

  const courses =
    data.courses || [];

  return (
    <section
      id="google-classroom"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {courses.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="text-5xl">
            🏫
          </div>

          <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
            No active classes found
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Your Google account is connected, but
            Google Classroom did not return any active
            classes.
          </p>

          <button
            type="button"
            onClick={loadClassroom}
            className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            ↻ Refresh
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map(
            (course) => (
              <article
                key={course.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                        Classroom
                      </p>

                      <h3 className="mt-2 text-2xl font-bold">
                        {course.name}
                      </h3>

                      {course.section && (
                        <p className="mt-1 text-sm text-blue-100">
                          Section {course.section}
                        </p>
                      )}
                    </div>

                    <div className="rounded-2xl bg-white/15 px-3 py-2 text-sm font-bold backdrop-blur">
                      ACTIVE
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-6">
                  {course.description && (
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {course.description}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {course.coursework.length}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                        Classwork
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {course.materials.length}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                        Materials
                      </p>
                    </div>
                  </div>

                  {course.coursework.length > 0 && (
                    <div>
                      <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                        📝 Recent Classwork
                      </h4>

                      <div className="space-y-2">
                        {course.coursework
                          .slice(0, 5)
                          .map(
                            (work) => (
                              <a
                                key={work.id}
                                href={
                                  work.alternateLink ||
                                  "#"
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                              >
                                <p className="font-semibold text-slate-900 dark:text-white">
                                  {work.title ||
                                    "Untitled classwork"}
                                </p>

                                {work.description && (
                                  <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                                    {work.description}
                                  </p>
                                )}
                              </a>
                            )
                          )}
                      </div>
                    </div>
                  )}

                  {course.materials.length > 0 && (
                    <div>
                      <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                        📚 Materials
                      </h4>

                      <div className="space-y-2">
                        {course.materials
                          .slice(0, 5)
                          .map(
                            (material) => {
                              const driveFile =
                                material.materials?.find(
                                  (item) =>
                                    item.driveFile
                                )?.driveFile
                                  ?.driveFile;

                              const link =
                                driveFile?.alternateLink ||
                                material.alternateLink ||
                                "#";

                              const title =
                                driveFile?.title ||
                                material.title ||
                                "Untitled material";

                              return (
                                <a
                                  key={material.id}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                                >
                                  {driveFile?.thumbnailUrl ? (
                                    <img
                                      src={
                                        driveFile.thumbnailUrl
                                      }
                                      alt=""
                                      className="h-12 w-12 rounded-xl object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl dark:bg-blue-950/40">
                                      📎
                                    </div>
                                  )}

                                  <div className="min-w-0">
                                    <p className="truncate font-semibold text-slate-900 dark:text-white">
                                      {title}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                      Open material
                                    </p>
                                  </div>
                                </a>
                              );
                            }
                          )}
                      </div>
                    </div>
                  )}

                  <a
                    href={
                      course.alternateLink ||
                      "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    Open Classroom →
                  </a>
                </div>
              </article>
            )
          )}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}
    </section>
  );
}