"use client";

import {
  UploadCloud,
  FileText,
  CheckCircle,
} from "lucide-react";

import { useState } from "react";

import { faculties } from "@/data/faculties";
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


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

      // Check logged in user
      const {
        data: { user },
      } = await supabase.auth.getUser();


      if (!user) {
        throw new Error("You must be logged in to upload resources.");
      }



      const safeFileName =
        selectedFile.name.replace(/\s+/g, "-");


      const storagePath =
        `${Date.now()}-${safeFileName}`;



      console.log(
        "Uploading file:",
        storagePath
      );



      const {
        error: uploadError
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



      const {
        data: publicUrlData
      } =
        supabase.storage
          .from("resources")
          .getPublicUrl(storagePath);



      const resourceData = {

        title: form.title,

        faculty: selectedFaculty,

        programme: selectedProgramme,

        year: form.year,

        semester: form.semester,

        category: form.category,

        course: form.course,

        file_url: publicUrlData.publicUrl,

        file_type: selectedFile.type,

        file_name: selectedFile.name,

        storage_path: storagePath,

        file_size: selectedFile.size,

      };



      console.log(
        "INSERTING RESOURCE:",
        resourceData
      );



      const {
        error: databaseError
      } =
        await supabase
          .from("resources")
          .insert(resourceData);



      if (databaseError) {
        throw databaseError;
      }



      setSubmitted(true);



    } catch(error:any) {


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

      {
        submitted ? (

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
              Your resource is now available in Luqify e-Library.
            </p>


          </div>


        ) : (


<form
onSubmit={handleSubmit}
className="space-y-6"
>


<div>

<label className="mb-2 block font-semibold text-[#3B2412]">
Faculty
</label>

<select
value={selectedFaculty}
onChange={(e)=>{
setSelectedFaculty(e.target.value);
setSelectedProgramme("");
}}
className="w-full rounded-2xl border border-[#d9c7aa] bg-[#FAF7F0] px-4 py-3"
>

<option value="">
Select Faculty
</option>

{
faculties.map((faculty)=>(
<option
key={faculty.slug}
value={faculty.slug}
>
{faculty.name}
</option>
))
}

</select>

</div>



<div>

<label className="mb-2 block font-semibold text-[#3B2412]">
Programme
</label>

<select
value={selectedProgramme}
onChange={(e)=>setSelectedProgramme(e.target.value)}
className="w-full rounded-2xl border border-[#d9c7aa] bg-[#FAF7F0] px-4 py-3"
>

<option value="">
Select Programme
</option>

{
currentFaculty?.programs.map((program)=>(
<option
key={program.slug}
value={program.slug}
>
{program.name}
</option>
))
}

</select>

</div>



<div className="grid gap-5 md:grid-cols-2">

<select
name="year"
value={form.year}
onChange={handleChange}
className="rounded-2xl border border-[#d9c7aa] bg-[#FAF7F0] px-4 py-3"
>

<option value="">
Academic Year
</option>

<option>Year 1</option>
<option>Year 2</option>
<option>Year 3</option>
<option>Year 4</option>

</select>


<select
name="semester"
value={form.semester}
onChange={handleChange}
className="rounded-2xl border border-[#d9c7aa] bg-[#FAF7F0] px-4 py-3"
>

<option value="">
Semester
</option>

<option>Semester 1</option>
<option>Semester 2</option>

</select>

</div>



<input
name="course"
value={form.course}
onChange={handleChange}
placeholder="Example: Cost Accounting"
className="w-full rounded-2xl border border-[#d9c7aa] bg-[#FAF7F0] px-4 py-3"
/>



<select
name="category"
value={form.category}
onChange={handleChange}
className="w-full rounded-2xl border border-[#d9c7aa] bg-[#FAF7F0] px-4 py-3"
>

<option value="">
Resource Type
</option>

<option>Lecture Notes</option>
<option>Tutorials</option>
<option>Past Papers</option>
<option>Presentation Slides</option>
<option>Study Guides</option>

</select>



<input
name="title"
value={form.title}
onChange={handleChange}
placeholder="Resource Title"
className="w-full rounded-2xl border border-[#d9c7aa] bg-[#FAF7F0] px-4 py-3"
/>



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
"
>

<UploadCloud
size={35}
className="text-[#C9A96E]"
/>


<span className="font-semibold">
Browse Files
</span>


{
selectedFile && (
<span className="text-sm font-semibold text-[#3B2412]">
{selectedFile.name}
</span>
)
}


<input
type="file"
accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
onChange={(e)=>{
if(e.target.files){
setSelectedFile(e.target.files[0]);
}
}}
className="hidden"
/>

</label>



<button
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
disabled:opacity-50
"
>

<FileText size={20}/>

{
loading
? "Uploading..."
: "Submit Resource"
}

</button>


</form>

        )

      }

    </div>

  );

}