"use client";

import {
  UploadCloud,
  FileText,
  CheckCircle,
  Film,
  Image as ImageIcon,
  FileArchive,
  Headphones,
} from "lucide-react";

import { useState } from "react";

import { faculties } from "@/data/faculties";
import { courses } from "@/data/courses";
import { supabase } from "@/lib/supabase";

export default function UploadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedProgramme, setSelectedProgramme] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    course: "",
    year: "",
    semester: "",
    category: "",
  });

  const currentFaculty = faculties.find(
    (faculty) => faculty.slug === selectedFaculty
  );

  const availableCourses = courses.filter(
    (course) =>
      course.program === selectedProgramme &&
      course.year === form.year &&
      course.semester === form.semester
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "year" || name === "semester"
        ? { course: "" }
        : {}),
    }));
  }

  function getFileIcon() {
    if (!selectedFile) {
      return (
        <UploadCloud
          size={35}
          className="text-[#C9A96E]"
        />
      );
    }

    const type = selectedFile.type.toLowerCase();

    if (type.startsWith("video/")) {
      return (
        <Film
          size={35}
          className="text-[#C9A96E]"
        />
      );
    }

    if (type.startsWith("image/")) {
      return (
        <ImageIcon
          size={35}
          className="text-[#C9A96E]"
        />
      );
    }

    if (type.startsWith("audio/")) {
      return (
        <Headphones
          size={35}
          className="text-[#C9A96E]"
        />
      );
    }

    if (
      type === "application/zip" ||
      type === "application/x-zip-compressed"
    ) {
      return (
        <FileArchive
          size={35}
          className="text-[#C9A96E]"
        />
      );
    }

    return (
      <FileText
        size={35}
        className="text-[#C9A96E]"
      />
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file.");
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
      alert("Please complete all fields.");
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
      // SAFE FILE NAME
      // -----------------------------------------

      const safeFileName = selectedFile.name
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9._-]/g, "");

      const storagePath = `${Date.now()}-${safeFileName}`;

      console.log("Uploading file:", storagePath);
      console.log("File type:", selectedFile.type);
      console.log("File size:", selectedFile.size);

      // -----------------------------------------
      // UPLOAD TO SUPABASE STORAGE
      // -----------------------------------------

      const { error: uploadError } = await supabase.storage
        .from("resources")
        .upload(storagePath, selectedFile, {
          cacheControl: "3600",
          upsert: false,
          contentType:
            selectedFile.type ||
            "application/octet-stream",
        });

      if (uploadError) {
        throw uploadError;
      }

      // -----------------------------------------
      // GET PUBLIC URL
      // -----------------------------------------

      const { data: publicUrlData } =
        supabase.storage
          .from("resources")
          .getPublicUrl(storagePath);

      const publicUrl = publicUrlData.publicUrl;

      if (!publicUrl) {
        throw new Error(
          "Could not generate the resource URL."
        );
      }

      // -----------------------------------------
      // INSERT RESOURCE
      // -----------------------------------------

      const resourceData = {
        title: form.title.trim(),

        faculty: selectedFaculty,

        programme: selectedProgramme,

        year: form.year,

        semester: form.semester,

        category: form.category,

        course: form.course,

        file_url: publicUrl,

        file_type:
          selectedFile.type ||
          "application/octet-stream",

        file_name: selectedFile.name,

        storage_path: storagePath,

        file_size: selectedFile.size,
      };

      console.log(
        "INSERTING RESOURCE:",
        resourceData
      );

      const { error: databaseError } = await supabase
        .from("resources")
        .insert(resourceData);

      if (databaseError) {
        throw databaseError;
      }

      // -----------------------------------------
      // GLOBAL NOTIFICATION
      // -----------------------------------------

      const { error: notificationError } =
        await supabase
          .from("notifications")
          .insert({
            student_id: null,

            title: "New Resource Uploaded",

            message: `${form.title} has been added to the Luqify e-Library.`,

            type: "resource",

            read: false,
          });

      if (notificationError) {
        console.error(
          "NOTIFICATION CREATION ERROR:",
          notificationError
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
          "Upload failed."
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
        p-6
        shadow-xl
        transition-colors
        sm:p-8
        dark:border-slate-800
        dark:bg-slate-900
        dark:shadow-black/30
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
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-[#C9A96E]/10
              dark:bg-[#C9A96E]/15
            "
          >
            <CheckCircle
              size={60}
              className="text-[#C9A96E]"
            />
          </div>

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
              max-w-md
              text-[#6b5844]
              dark:text-slate-300
            "
          >
            Your resource is now available
            in Luqify e-Library.
          </p>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setSelectedFile(null);
              setSelectedFaculty("");
              setSelectedProgramme("");

              setForm({
                title: "",
                course: "",
                year: "",
                semester: "",
                category: "",
              });
            }}
            className="
              mt-8
              rounded-2xl
              bg-[#3B2412]
              px-6
              py-3
              font-bold
              text-white
              transition
              hover:-translate-y-1
              hover:bg-[#4d301b]
              dark:bg-[#C9A96E]
              dark:text-[#24170d]
            "
          >
            Upload Another Resource
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* FACULTY */}

          <div>
            <label
              className="
                mb-2
                block
                font-semibold
                text-[#3B2412]
                dark:text-slate-100
              "
            >
              Faculty
            </label>

            <select
              value={selectedFaculty}
              onChange={(e) => {
                setSelectedFaculty(e.target.value);
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
                text-[#3B2412]
                outline-none
                transition
                focus:border-[#C9A96E]
                focus:ring-2
                focus:ring-[#C9A96E]/20
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
              "
            >
              <option value="">
                Select Faculty
              </option>

              {faculties.map((faculty) => (
                <option
                  key={faculty.slug}
                  value={faculty.slug}
                >
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>

          {/* PROGRAMME */}

          <div>
            <label
              className="
                mb-2
                block
                font-semibold
                text-[#3B2412]
                dark:text-slate-100
              "
            >
              Programme
            </label>

            <select
              value={selectedProgramme}
              disabled={!selectedFaculty}
              onChange={(e) => {
                setSelectedProgramme(e.target.value);

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
                text-[#3B2412]
                outline-none
                transition
                focus:border-[#C9A96E]
                focus:ring-2
                focus:ring-[#C9A96E]/20
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
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
            <div>
              <label
                className="
                  mb-2
                  block
                  font-semibold
                  text-[#3B2412]
                  dark:text-slate-100
                "
              >
                Academic Year
              </label>

              <select
                name="year"
                value={form.year}
                disabled={!selectedProgramme}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#d9c7aa]
                  bg-[#FAF7F0]
                  px-4
                  py-3
                  text-[#3B2412]
                  outline-none
                  transition
                  focus:border-[#C9A96E]
                  focus:ring-2
                  focus:ring-[#C9A96E]/20
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-100
                "
              >
                <option value="">
                  Select Academic Year
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
            </div>

            <div>
              <label
                className="
                  mb-2
                  block
                  font-semibold
                  text-[#3B2412]
                  dark:text-slate-100
                "
              >
                Semester
              </label>

              <select
                name="semester"
                value={form.semester}
                disabled={!selectedProgramme}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#d9c7aa]
                  bg-[#FAF7F0]
                  px-4
                  py-3
                  text-[#3B2412]
                  outline-none
                  transition
                  focus:border-[#C9A96E]
                  focus:ring-2
                  focus:ring-[#C9A96E]/20
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-100
                "
              >
                <option value="">
                  Select Semester
                </option>

                <option value="semester-1">
                  Semester 1
                </option>

                <option value="semester-2">
                  Semester 2
                </option>
              </select>
            </div>
          </div>

          {/* COURSE */}

          <div>
            <label
              className="
                mb-2
                block
                font-semibold
                text-[#3B2412]
                dark:text-slate-100
              "
            >
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
                text-[#3B2412]
                outline-none
                transition
                focus:border-[#C9A96E]
                focus:ring-2
                focus:ring-[#C9A96E]/20
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
              "
            >
              <option value="">
                {!selectedProgramme
                  ? "Select Programme First"
                  : !form.year
                  ? "Select Academic Year First"
                  : !form.semester
                  ? "Select Semester First"
                  : availableCourses.length === 0
                  ? "No courses found"
                  : "Select Course"}
              </option>

              {availableCourses.map((course) => (
                <option
                  key={course.slug}
                  value={course.name}
                >
                  {course.name}
                </option>
              ))}
            </select>

            {selectedProgramme &&
              form.year &&
              form.semester &&
              availableCourses.length === 0 && (
                <p
                  className="
                    mt-2
                    text-xs
                    font-medium
                    text-amber-600
                    dark:text-amber-400
                  "
                >
                  No courses are currently
                  available for this programme,
                  year and semester.
                </p>
              )}
          </div>

          {/* RESOURCE TYPE */}

          <div>
            <label
              className="
                mb-2
                block
                font-semibold
                text-[#3B2412]
                dark:text-slate-100
              "
            >
              Resource Type
            </label>

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
                text-[#3B2412]
                outline-none
                transition
                focus:border-[#C9A96E]
                focus:ring-2
                focus:ring-[#C9A96E]/20
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
              "
            >
              <option value="">
                Select Resource Type
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

              <option value="Audio Tutorials">
                Audio Tutorials
              </option>

              <option value="Recorded Lectures">
                Recorded Lectures
              </option>

              <option value="Video Lectures">
                Video Lectures
              </option>

              <option value="Other Resources">
                Other Resources
              </option>
            </select>
          </div>

          {/* TITLE */}

          <div>
            <label
              className="
                mb-2
                block
                font-semibold
                text-[#3B2412]
                dark:text-slate-100
              "
            >
              Resource Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter resource title"
              className="
                w-full
                rounded-2xl
                border
                border-[#d9c7aa]
                bg-[#FAF7F0]
                px-4
                py-3
                text-[#3B2412]
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-[#C9A96E]
                focus:ring-2
                focus:ring-[#C9A96E]/20
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-100
                dark:placeholder:text-slate-500
              "
            />
          </div>

          {/* FILE */}

          <div>
            <label
              className="
                mb-2
                block
                font-semibold
                text-[#3B2412]
                dark:text-slate-100
              "
            >
              Resource File
            </label>

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
                transition
                hover:bg-[#f4eddf]
                dark:bg-slate-800
                dark:hover:bg-slate-700
              "
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#C9A96E]/10
                  dark:bg-[#C9A96E]/15
                "
              >
                {getFileIcon()}
              </div>

              <span
                className="
                  font-bold
                  text-[#3B2412]
                  dark:text-slate-100
                "
              >
                Browse Files
              </span>

              <span
                className="
                  max-w-md
                  text-xs
                  leading-5
                  text-slate-500
                  dark:text-slate-400
                "
              >
                PDF, Word, PowerPoint, Excel,
                Images, Video, Audio or ZIP
              </span>

              <span
                className="
                  text-[11px]
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Notes, tutorials, assignments,
                videos, audio and study materials
              </span>

              {selectedFile && (
                <span
                  className="
                    max-w-full
                    truncate
                    rounded-xl
                    bg-[#C9A96E]/10
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-[#3B2412]
                    dark:bg-[#C9A96E]/15
                    dark:text-slate-100
                  "
                >
                  {selectedFile.name}
                </span>
              )}

              <input
                type="file"
                accept="
                  .pdf,
                  .doc,
                  .docx,
                  .ppt,
                  .pptx,
                  .xls,
                  .xlsx,
                  .csv,
                  .jpg,
                  .jpeg,
                  .png,
                  .webp,
                  .gif,
                  .svg,
                  .zip,
                  .rar,
                  .7z,
                  .mp4,
                  .webm,
                  .mov,
                  .m4v,
                  .mp3,
                  .wav,
                  .ogg,
                  .oga,
                  .m4a,
                  .aac,
                  .flac
                "
                onChange={(e) => {
                  const file =
                    e.target.files?.[0];

                  if (file) {
                    setSelectedFile(file);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>

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
              shadow-sm
              transition
              hover:-translate-y-1
              hover:bg-[#4d301b]
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:bg-[#C9A96E]
              dark:text-[#24170d]
              dark:hover:bg-[#d5b77d]
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