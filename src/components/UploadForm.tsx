"use client";

import {
  UploadCloud,
  FileText,
  CheckCircle,
} from "lucide-react";

import { useState } from "react";

import { faculties } from "@/data/faculties";



export default function UploadForm() {


  const [submitted,setSubmitted] = useState(false);

  const [selectedFaculty,setSelectedFaculty] = useState("");

  const [selectedFile,setSelectedFile] = useState<File | null>(null);



  function handleSubmit(e:React.FormEvent){

    e.preventDefault();

    setSubmitted(true);

  }



  const currentFaculty = faculties.find(
    (faculty)=>faculty.slug === selectedFaculty
  );





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
            Resource Submitted
          </h2>


          <p
            className="
              mt-3
              text-[#6b5844]
              dark:text-slate-300
            "
          >
            Your resource has been sent for review.
          </p>


        </div>



      ) : (


<form
onSubmit={handleSubmit}
className="space-y-6"
>


{/* FACULTY */}

<div>

<label className="
mb-2
block
font-semibold
text-[#3B2412]
">
Faculty
</label>


<select

value={selectedFaculty}

onChange={(e)=>setSelectedFaculty(e.target.value)}

className="
w-full
rounded-2xl
border
border-[#d9c7aa]
bg-[#FAF7F0]
px-4
py-3
outline-none
"

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





{/* PROGRAMME */}

<div>


<label className="
mb-2
block
font-semibold
text-[#3B2412]
">
Programme
</label>


<select

className="
w-full
rounded-2xl
border
border-[#d9c7aa]
bg-[#FAF7F0]
px-4
py-3
"

>


<option>
Select Programme
</option>



{
currentFaculty?.programs.map((program)=>(

<option
key={program.slug}
>

{program.name}

</option>

))

}


</select>


</div>







{/* YEAR + SEMESTER */}

<div
className="
grid
gap-5
md:grid-cols-2
"
>


<select
className="
rounded-2xl
border
border-[#d9c7aa]
bg-[#FAF7F0]
px-4
py-3
"
>

<option>
Academic Year
</option>

<option>
Year 1
</option>

<option>
Year 2
</option>

<option>
Year 3
</option>

<option>
Year 4
</option>


</select>





<select
className="
rounded-2xl
border
border-[#d9c7aa]
bg-[#FAF7F0]
px-4
py-3
"
>

<option>
Semester
</option>

<option>
Semester 1
</option>

<option>
Semester 2
</option>


</select>



</div>









{/* COURSE */}

<div>

<label className="
mb-2
block
font-semibold
text-[#3B2412]
">

Course

</label>


<input

placeholder="Example: Cost Accounting"

className="
w-full
rounded-2xl
border
border-[#d9c7aa]
bg-[#FAF7F0]
px-4
py-3
"

/>


</div>








{/* RESOURCE TYPE */}

<div>

<label className="
mb-2
block
font-semibold
text-[#3B2412]
">

Resource Type

</label>



<select

className="
w-full
rounded-2xl
border
border-[#d9c7aa]
bg-[#FAF7F0]
px-4
py-3
"

>


<option>
Select Type
</option>

<option>
Lecture Notes
</option>

<option>
Tutorials
</option>

<option>
Past Papers
</option>

<option>
Presentation Slides
</option>

<option>
Study Guides
</option>

<option>
Other
</option>


</select>


</div>







{/* TITLE */}

<div>

<label className="
mb-2
block
font-semibold
text-[#3B2412]
">

Resource Title

</label>


<input

placeholder="Example: Cost Accounting Chapter 1 Notes"

className="
w-full
rounded-2xl
border
border-[#d9c7aa]
bg-[#FAF7F0]
px-4
py-3
"

/>


</div>










{/* UPLOAD */}


<div>


<label className="
mb-2
block
font-semibold
text-[#3B2412]
">

Upload Resource

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
hover:bg-[#f4ead7]
"

>


<UploadCloud
size={35}
className="text-[#C9A96E]"
/>



<span className="font-semibold">

Browse Files

</span>



<span className="
text-sm
text-[#6b5844]
">

PDF, Word, PowerPoint, Excel or Images

</span>



{
selectedFile && (

<span className="
text-sm
font-semibold
text-[#3B2412]
">

{selectedFile.name}

</span>

)

}




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
.jpg,
.jpeg,
.png
"

onChange={(e)=>{

if(e.target.files){

setSelectedFile(e.target.files[0]);

}

}}

className="hidden"

/>



</label>


</div>








<button

type="submit"

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
"

>


<FileText size={20}/>

Submit Resource


</button>





</form>


      )

    }


    </div>

  );

}