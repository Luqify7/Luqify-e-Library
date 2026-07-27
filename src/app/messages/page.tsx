import {
  MessageCircle,
  Users,
  GraduationCap,
  BookOpen,
} from "lucide-react";


const rooms = [

  {
    title: "Commerce Faculty",
    description:
      "Discuss commerce resources and announcements.",
    icon: Users,
  },


  {
    title: "Bachelor of Accountancy",
    description:
      "Accounting students resource requests.",
    icon: GraduationCap,
  },


  {
    title: "Year 2 Students",
    description:
      "Academic discussions and study support.",
    icon: BookOpen,
  },

];



const messages = [

  {
    user: "Student",
    text:
      "Does anyone have Cost Accounting notes?",
    time:
      "10:30 AM",
  },


  {
    user: "Student",
    text:
      "I uploaded the Accounting past paper.",
    time:
      "Yesterday",
  },


];



export default function MessagesPage() {


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
          max-w-6xl
        "
      >



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

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                rounded-2xl
                bg-[#3B2412]
                p-4
                text-white
              "
            >

              <MessageCircle size={28}/>

            </div>


            <div>

              <h1
                className="
                  text-4xl
                  font-black
                "
              >
                Messages
              </h1>


              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Connect with students and request learning materials.
              </p>


            </div>


          </div>


        </div>





        <div
          className="
            grid
            gap-6
            md:grid-cols-3
          "
        >

          {
            rooms.map((room)=>{


              const Icon = room.icon;


              return (

                <button

                  key={room.title}

                  className="
                    rounded-3xl
                    bg-white
                    p-6
                    text-left
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-lg
                    dark:bg-slate-900
                  "

                >

                  <div
                    className="
                      mb-5
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#FAF7F0]
                      text-[#C9A96E]
                      dark:bg-slate-800
                    "
                  >

                    <Icon size={26}/>

                  </div>


                  <h2
                    className="
                      text-lg
                      font-bold
                    "
                  >
                    {room.title}
                  </h2>


                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {room.description}
                  </p>


                </button>

              );


            })
          }


        </div>





        <div
          className="
            mt-10
            rounded-[2rem]
            bg-white
            p-8
            shadow-sm
            dark:bg-slate-900
          "
        >

          <h2
            className="
              mb-6
              text-2xl
              font-black
            "
          >
            Recent Messages
          </h2>



          <div className="space-y-5">


            {
              messages.map((message,index)=>(


                <div
                  key={index}
                  className="
                    rounded-2xl
                    bg-[#FAF7F0]
                    p-5
                    dark:bg-slate-800
                  "
                >

                  <div
                    className="
                      flex
                      justify-between
                    "
                  >

                    <p className="font-bold">
                      {message.user}
                    </p>


                    <span
                      className="
                        text-xs
                        text-[#C9A96E]
                      "
                    >
                      {message.time}
                    </span>


                  </div>


                  <p
                    className="
                      mt-2
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    {message.text}
                  </p>


                </div>


              ))
            }


          </div>


        </div>



      </section>


    </main>

  );

}