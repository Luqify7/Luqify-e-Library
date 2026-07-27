import {
  Bell,
  FileText,
  CalendarDays,
  Megaphone,
} from "lucide-react";


const notifications = [

  {
    icon: FileText,
    title: "New Resource Uploaded",
    message:
      "Accounting Study Guides have been added to the library.",
    time:
      "2 hours ago",
  },


  {
    icon: CalendarDays,
    title: "Exam Reminder",
    message:
      "Your semester exams are coming in 2 weeks. Start preparing early.",
    time:
      "Yesterday",
  },


  {
    icon: Megaphone,
    title: "Luqify e-Library Announcement",
    message:
      "Welcome to the improved Luqify e-Library experience.",
    time:
      "3 days ago",
  },

];



export default function NotificationsPage() {


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


      <section className="mx-auto max-w-5xl">


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

              <Bell size={28}/>

            </div>


            <div>

              <h1
                className="
                  text-4xl
                  font-black
                "
              >
                Notifications
              </h1>


              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Stay updated with academic news and resources.
              </p>

            </div>


          </div>


        </div>





        <div className="grid gap-5">


          {
            notifications.map((item,index)=>{


              const Icon = item.icon;


              return (

                <div

                  key={index}

                  className="
                    flex
                    gap-5
                    rounded-3xl
                    bg-white
                    p-6
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-lg
                    dark:bg-slate-900
                  "

                >


                  <div
                    className="
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

                    <Icon size={25}/>

                  </div>




                  <div>


                    <h2
                      className="
                        font-bold
                        text-lg
                      "
                    >
                      {item.title}
                    </h2>


                    <p
                      className="
                        mt-1
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {item.message}
                    </p>


                    <span
                      className="
                        mt-3
                        block
                        text-xs
                        text-[#C9A96E]
                      "
                    >
                      {item.time}
                    </span>


                  </div>


                </div>

              );


            })
          }


        </div>



      </section>


    </main>

  );

}