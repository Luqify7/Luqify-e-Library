"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminUploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [faculty, setFaculty] = useState("");
  const [programme, setProgramme] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [category, setCategory] = useState("");
  const [course, setCourse] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setLoading(true);
    setMessage("Uploading...");

    // Check current user
    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    console.log("CURRENT USER:", userData.user);
    console.log("AUTH ERROR:", userError);

    const fileName = `${Date.now()}-${file.name}`;

    // Upload file to Storage
    const { error: uploadError } = await supabase.storage
      .from("resources")
      .upload(fileName, file);

    if (uploadError) {
      console.error("STORAGE ERROR:", uploadError);

      setMessage(
        `Storage Error:
${uploadError.message}`
      );

      setLoading(false);
      return;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("resources")
      .getPublicUrl(fileName);

    console.log("FILE URL:", publicUrl);

    // Insert into database
    const { data, error: insertError } = await supabase
      .from("resources")
      .insert([
        {
          title,
          faculty,
          programme,
          year,
          semester,
          category,
          course,
          file_url: publicUrl,
          file_type: file.type,
        },
      ])
      .select();

    if (insertError) {
      console.error(
        "DATABASE ERROR MESSAGE:",
        insertError.message
      );

      console.error(
        "DATABASE ERROR CODE:",
        insertError.code
      );

      console.error(
        "DATABASE ERROR DETAILS:",
        insertError.details
      );

      console.error(
        "DATABASE ERROR HINT:",
        insertError.hint
      );

      setMessage(
        `Database Error:

Message: ${insertError.message}

Code: ${insertError.code}

Details: ${insertError.details}

Hint: ${insertError.hint}`
      );

      setLoading(false);
      return;
    }

    console.log("INSERT SUCCESS:", data);

    setMessage("Resource uploaded successfully!");

    setTitle("");
    setFaculty("");
    setProgramme("");
    setYear("");
    setSemester("");
    setCategory("");
    setCourse("");
    setFile(null);

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleUpload}
      className="
        rounded-3xl
        bg-white
        border
        border-[#e8dcc8]
        p-8
        shadow-xl
        space-y-5
      "
    >
      <h2 className="text-2xl font-bold text-[#3B2412]">
        Upload Resource
      </h2>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
        className="w-full"
      />

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
      />

      <input
        placeholder="Faculty"
        value={faculty}
        onChange={(e) => setFaculty(e.target.value)}
        className="input"
      />

      <input
        placeholder="Programme"
        value={programme}
        onChange={(e) => setProgramme(e.target.value)}
        className="input"
      />

      <input
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="input"
      />

      <input
        placeholder="Semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        className="input"
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input"
      />

      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="input"
      />

      {message && (
        <pre className="text-sm whitespace-pre-wrap text-[#3B2412]">
          {message}
        </pre>
      )}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded-xl
          bg-[#3B2412]
          py-3
          text-white
          font-bold
          cursor-pointer
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? "Uploading..." : "Upload Resource"}
      </button>
    </form>
  );
}