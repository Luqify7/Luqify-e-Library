"use client";

import {
  UploadCloud,
  FileText,
  CheckCircle,
} from "lucide-react";

import { useState } from "react";

import { faculties } from "@/data/faculties";
import { courses } from "@/data/courses";
import { supabase } from "@/lib/supabase";

export default function UploadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedProgramme, setSelectedProgramme] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    course: "",
    year: "",
    semester: "",
    category: "",
  });

  const currentFaculty = faculties.find(
    (faculty) =>
      faculty.slug === selectedFaculty
  );

  const availableCourses = courses.filter(
    (course) =>
      course.program === selectedProgramme &&
      course.year === form.year &&
      course.semester === form.semester
  );

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "year" ||
      name === "semester"
        ? { course: "" }
        : {}),
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    if (
      !selectedFaculty ||
      !selectedProgramme ||
      !form.title ||
      !form.course ||
      !form.year ||
      !form.semester ||
      !form.category
    ) {
      alert("Please complete all fields");
      return;
    }

    setLoading(true);

    try {
      // -----------------------------------------
      // CHECK LOGGED IN USER
      // -----------------------------------------

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error(
          "You must be logged in to upload resources."
        );
      }

      // -----------------------------------------
      // UPLOAD FILE
      // -----------------------------------------

      const safeFileName =
        selectedFile.name.replace(
          /\s+/g,
          "-"
        );

      const storagePath =
        `${Date.now()}-${safeFileName}`;

      console.log(
        "Uploading file:",
        storagePath
      );

      const {
        error: uploadError,
      } = await supabase.storage
        .from("resources")
        .upload(
          storagePath,
          selectedFile,
          {
            upsert: false,
          }
        );

      if (uploadError) {
        throw uploadError;
      }

      // -----------------------------------------
      // GET PUBLIC URL
      // -----------------------------------------

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("resources")
        .getPublicUrl(
          storagePath
        );

      // -----------------------------------------
      // INSERT RESOURCE
      // -----------------------------------------

      const resourceData = {
        title: form.title,
        faculty: selectedFaculty,
        programme: selectedProgramme,
        year: form.year,
        semester: form.semester,
        category: form.category,
        course: form.course,
        file_url:
          publicUrlData.publicUrl,
        file_type:
          selectedFile.type,
        file_name:
          selectedFile.name,
        storage_path:
          storagePath,
        file_size:
          selectedFile.size,
      };

      console.log(
        "INSERTING RESOURCE:",
        resourceData
      );

      const {
        error: databaseError,
      } = await supabase
        .from("resources")
        .insert(
          resourceData
        );

      if (databaseError) {
        throw databaseError;
      }

      // -----------------------------------------
      // CREATE GLOBAL NOTIFICATION
      // -----------------------------------------

      const {
        error: notificationError,
      } = await supabase
        .from("notifications")
        .insert({
          student_id: null,

          title:
            "New Resource Uploaded",

          message:
            `${form.title} has been added to the Luqify e-Library.`,

          type: "resource",

          read: false,
        });

      if (notificationError) {
        console.error(
          "NOTIFICATION CREATION ERROR:",
          notificationError
        );

        /*
         * The resource has already been
         * uploaded successfully.
         *
         * Therefore we do NOT fail the
         * upload if notification creation
         * fails.
         */
      } else {
        console.log(
          "NOTIFICATION CREATED SUCCESSFULLY"
        );
      }

      // -----------------------------------------
      // SUCCESS
      // -----------------------------------------

      setSubmitted(true);

    } catch (error: any) {
      console.error(
        "UPLOAD FAILED:",
        error
      );

      console.error(
        "MESSAGE:",
        error?.message
      );

      console.error(
        "CODE:",
        error?.code
      );

      console.error(
        "DETAILS:",
        error?.details
      );

      alert(
        error?.message ||
          "Upload failed"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        rounded-[2.5rem]
        border
        border-[#e8dcc8]
        bg-white
        p-8
        shadow-xl
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {submitted ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            py-16
            text-center
          "
        >
          <CheckCircle
            size={60}
            className="text-[#C9A96E]"
          />

          <h2
            className="
              mt-6
              text-2xl
              font-bold
              text-[#3B2412]
              dark:text-white
            "
          >
            Resource Uploaded
          </h2>

          <p
            className="
              mt-3
              text-[#6b5844]
              dark:text-slate-300
            "
          >
            Your resource is now available
            in Luqify e-Library.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* FACULTY */}

          <div>
            <label className="mb-2 block font-semibold text-[#3B2412] dark:text-white">
              Faculty
            </label>

            <select
              value={selectedFaculty}
              onChange={(e) => {
                setSelectedFaculty(
                  e.target.value
                );

                setSelectedProgramme("");

                setForm((previous) => ({
                  ...previous,
                  course: "",
                  year: "",
                  semester: "",
                }));
              }}
              className="
                w-full
                rounded-2xl
                border
                border-[#d9c7aa]
                bg-[#FAF7F0]
                px-4
                py-3
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            >
              <option value="">
                Select Faculty
              </option>

              {faculties.map(
                (faculty) => (
                  <option
                    key={faculty.slug}
                    value={faculty.slug}
                  >
                    {faculty.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* PROGRAMME */}

          <div>
            <label className="mb-2 block font-semibold text-[#3B2412] dark:text-white">
              Programme
            </label>

            <select
              value={selectedProgramme}
              disabled={!selectedFaculty}
              onChange={(e) => {
                setSelectedProgramme(
                  e.target.value
                );

                setForm((previous) => ({
                  ...previous,
                  course: "",
                  year: "",
                  semester: "",
                }));
              }}
              className="
                w-full
                rounded-2xl
                border
                border-[#d9c7aa]
                bg-[#FAF7F0]
                px-4
                py-3
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            >
              <option value="">
                Select Programme
              </option>

              {currentFaculty?.programs.map(
                (program) => (
                  <option
                    key={program.slug}
                    value={program.slug}
                  >
                    {program.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* YEAR + SEMESTER */}

          <div className="grid gap-5 md:grid-cols-2">
            <select
              name="year"
              value={form.year}
              disabled={!selectedProgramme}
              onChange={handleChange}
              className="
                rounded-2xl
                border
                border-[#d9c7aa]
                bg-[#FAF7F0]
                px-4
                py-3
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            >
              <option value="">
                Academic Year
              </option>

              <option value="year-1">
                Year 1
              </option>

              <option value="year-2">
                Year 2
              </option>

              <option value="year-3">
                Year 3
              </option>

              <option value="year-4">
                Year 4
              </option>
            </select>

            <select
              name="semester"
              value={form.semester}
              disabled={!selectedProgramme}
              onChange={handleChange}
              className="
                rounded-2xl
                border
                border-[#d9c7aa]
                bg-[#FAF7F0]
                px-4
                py-3
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            >
              <option value="">
                Semester
              </option>

              <option value="semester-1">
                Semester 1
              </option>

              <option value="semester-2">
                Semester 2
              </option>
            </select>
          </div>

          {/* COURSE */}

          <div>
            <label className="mb-2 block font-semibold text-[#3B2412] dark:text-white">
              Course
            </label>

            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              disabled={
                !selectedProgramme ||
                !form.year ||
                !form.semester ||
                availableCourses.length === 0
              }
              className="
                w-full
                rounded-2xl
                border
                border-[#d9c7aa]
                bg-[#FAF7F0]
                px-4
                py-3
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            >
              <option value="">
                {!selectedProgramme
                  ? "Select Programme First"
                  : !form.year
                  ? "Select Academic Year First"
                  : !form.semester
                  ? "Select Semester First"
                  : availableCourses.length ===
                    0
                  ? "No courses found"
                  : "Select Course"}
              </option>

              {availableCourses.map(
                (course) => (
                  <option
                    key={course.slug}
                    value={course.name}
                  >
                    {course.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* RESOURCE TYPE */}

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="
              w-full
              rounded-2xl
              border
              border-[#d9c7aa]
              bg-[#FAF7F0]
              px-4
              py-3
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
            "
          >
            <option value="">
              Resource Type
            </option>

            <option value="Lecture Notes">
              Lecture Notes
            </option>

            <option value="Tutorials">
              Tutorials
            </option>

            <option value="Past Papers">
              Past Papers
            </option>

            <option value="Presentation Slides">
              Presentation Slides
            </option>

            <option value="Study Guides">
              Study Guides
            </option>
          </select>

          {/* TITLE */}

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Resource Title"
            className="
              w-full
              rounded-2xl
              border
              border-[#d9c7aa]
              bg-[#FAF7F0]
              px-4
              py-3
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
            "
          />

          {/* FILE */}

          <label
            className="
              flex
              cursor-pointer
              flex-col
              items-center
              justify-center
              gap-3
              rounded-2xl
              border-2
              border-dashed
              border-[#C9A96E]
              bg-[#FAF7F0]
              p-8
              text-center
              dark:bg-slate-800
            "
          >
            <UploadCloud
              size={35}
              className="text-[#C9A96E]"
            />

            <span className="font-semibold dark:text-white">
              Browse Files
            </span>

            {selectedFile && (
              <span className="text-sm font-semibold text-[#3B2412] dark:text-slate-200">
                {selectedFile.name}
              </span>
            )}

            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
              onChange={(e) => {
                if (e.target.files) {
                  setSelectedFile(
                    e.target.files[0]
                  );
                }
              }}
              className="hidden"
            />
          </label>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-[#3B2412]
              py-4
              font-bold
              text-white
              transition
              hover:-translate-y-1
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <FileText size={20} />

            {loading
              ? "Uploading..."
              : "Submit Resource"}
          </button>
        </form>
      )}
    </div>
  );
}