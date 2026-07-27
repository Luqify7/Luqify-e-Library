import {
  Settings,
  Bell,
  Moon,
  User,
  ShieldCheck,
} from "lucide-react";


const settings = [

  {
    title: "Profile",
    description:
      "Manage your student profile information.",
    icon: User,
  },


  {
    title: "Notifications",
    description:
      "Control academic alerts and updates.",
    icon: Bell,
  },


  {
    title: "Appearance",
    description:
      "Manage theme and display preferences.",
    icon: Moon,
  },


  {
    title: "Privacy & Security",
    description:
      "Keep your account and information secure.",
    icon: ShieldCheck,
  },

];



export default function SettingsPage() {


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
          max-w-5xl
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

              <Settings size={28}/>

            </div>


            <div>

              <h1
                className="
                  text-4xl
                  font-black
                "
              >
                Settings
              </h1>


              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Customize your Luqify experience.
              </p>


            </div>


          </div>


        </div>





        <div
          className="
            grid
            gap-6
          "
        >

          {
            settings.map((item)=>{


              const Icon = item.icon;


              return (

                <div
                  key={item.title}
                  className="
                    flex
                    items-center
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
                        text-lg
                        font-bold
                      "
                    >
                      {item.title}
                    </h2>


                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {item.description}
                    </p>


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