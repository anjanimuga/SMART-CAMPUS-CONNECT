

import { useNavigate } from "react-router-dom";



export default function CanteenLanding() {

  const navigate = useNavigate();



  return (

    <div className="min-h-screen bg-[#f7f6f2]">



      {/* HERO */}

      <div className="relative h-[85vh] overflow-hidden">



        <img

          src="/canteen-landing.jpg"

          alt="Campus Canteen"

          className="w-full h-full object-cover"

        />



        <div className="absolute inset-0 bg-black/45" />



        <div className="absolute inset-0 flex items-center">



          <div className="max-w-7xl mx-auto w-full px-8">



            <p className="text-white/80 uppercase tracking-[0.35em] text-sm mb-4">

              Campus Dining

            </p>



            <h1

              className="text-white text-6xl lg:text-8xl mb-6 leading-tight"

              style={{

                fontFamily: "Libre Baskerville",

              }}

            >

              Campus

              <br />

              Canteen

            </h1>



            <p className="text-white/90 text-xl max-w-xl leading-relaxed mb-6">

              Fresh meals, quick pickup and a better

              dining experience for students.

            </p>



            {/* Animated Tagline */}

            <div className="mb-10 h-8 overflow-hidden">

              <div className="flex flex-col animate-[tagline_9s_infinite] text-white/90 text-lg font-medium">

                <span className="h-8 flex items-center">

                  Freshly Prepared Every Day

                </span>

                <span className="h-8 flex items-center">

                  ↓

                </span>

                <span className="h-8 flex items-center">

                  Skip The Queue

                </span>

                <span className="h-8 flex items-center">

                  ↓

                </span>

                <span className="h-8 flex items-center">

                  Order Ahead &amp; Save Time

                </span>

                <span className="h-8 flex items-center">

                  Freshly Prepared Every Day

                </span>

              </div>

            </div>



            <style>{`

              @keyframes tagline {

                0%,16% { transform: translateY(0); }

                20%,36% { transform: translateY(-32px); }

                40%,56% { transform: translateY(-64px); }

                60%,76% { transform: translateY(-96px); }

                80%,96% { transform: translateY(-128px); }

                100% { transform: translateY(-160px); }

              }

            `}</style>



            <button

              onClick={() => navigate("/canteen-menu")}

              className="

                bg-[#18344f]

                text-white

                px-8

                py-4

                rounded-full

                text-lg

                hover:bg-[#10263a]

                transition

                shadow-md

                hover:shadow-lg

              "

            >

              Explore Menu →

            </button>



          </div>



        </div>



      </div>



      {/* CONTENT SECTION */}

      <div className="max-w-7xl mx-auto px-8 py-24">



        <div className="grid lg:grid-cols-2 gap-12">



          {/* QUICK ACCESS */}



          <div

            className="

              bg-white

              rounded-[32px]

              border

              border-[#ece7df]

              p-10

              shadow-sm

              hover:shadow-xl

              transition-all

              duration-300

            "

          >



            <h2

              className="text-3xl mb-10"

              style={{

                fontFamily: "Libre Baskerville",

              }}

            >

              Quick Access

            </h2>



            <div className="space-y-6">



              <div

                onClick={() => navigate("/canteen-menu")}

                className="

                  border

                  border-[#ece7df]

                  rounded-2xl

                  p-6

                  cursor-pointer

                  hover:border-[#18344f]

                  hover:bg-[#faf9f6]

                  transition-all

                  group

                "

              >

                <div className="flex justify-between items-center">



                  <div>



                    <h3 className="text-xl font-semibold flex items-center gap-3">

                      🍽 Explore Menu

                    </h3>



                    <p className="text-gray-500 mt-2">

                      Browse today's menu

                    </p>



                  </div>



                  <span className="text-2xl text-[#18344f] group-hover:translate-x-1 transition">

                    →

                  </span>



                </div>

              </div>



              <div

                onClick={() => navigate("/orders")}

                className="

                  border

                  border-[#ece7df]

                  rounded-2xl

                  p-6

                  cursor-pointer

                  hover:border-[#18344f]

                  hover:bg-[#faf9f6]

                  transition-all

                  group

                "

              >

                <div className="flex justify-between items-center">



                  <div>



                    <h3 className="text-xl font-semibold flex items-center gap-3">

                      📦 My Orders

                    </h3>



                    <p className="text-gray-500 mt-2">

                      Track your orders

                    </p>



                  </div>



                  <span className="text-2xl text-[#18344f] group-hover:translate-x-1 transition">

                    →

                  </span>



                </div>

              </div>



            </div>



          </div>



          {/* SPECIALS */}



          <div

            className="

              bg-white

              rounded-[32px]

              border

              border-[#ece7df]

              p-10

              shadow-sm

              hover:shadow-xl

              transition-all

              duration-300

            "

          >



            <div className="grid md:grid-cols-2 gap-10">



              <div>



                <h2

                  className="text-3xl mb-8"

                  style={{

                    fontFamily: "Libre Baskerville",

                  }}

                >

                  Today's Specials

                </h2>



                <div className="space-y-5 text-lg">



                  <div className="border-l-4 border-[#18344f] pl-5">

                    Chicken Biryani

                  </div>



                  <div className="border-l-4 border-[#18344f] pl-5">

                    Veg Fried Rice

                  </div>



                  <div className="border-l-4 border-[#18344f] pl-5">

                    Cold Coffee

                  </div>



                  <div className="border-l-4 border-[#18344f] pl-5">

                    Paneer Wrap

                  </div>



                </div>



              </div>



              <div>



                <h2

                  className="text-3xl mb-8"

                  style={{

                    fontFamily: "Libre Baskerville",

                  }}

                >

                  Popular Choices

                </h2>



                <div className="space-y-5 text-lg">



                  <div className="border-l-4 border-[#18344f] pl-5">

                    Chicken Burger

                  </div>



                  <div className="border-l-4 border-[#18344f] pl-5">

                    French Fries

                  </div>



                  <div className="border-l-4 border-[#18344f] pl-5">

                    Masala Dosa

                  </div>



                  <div className="border-l-4 border-[#18344f] pl-5">

                    Ice Cream

                  </div>



                </div>



              </div>



            </div>



          </div>



        </div>



        {/* CAMPUS DINING */}



        <div

          className="

            mt-16

            bg-white

            rounded-[32px]

            border

            border-[#ece7df]

            p-12

            shadow-sm

          "

        >



          <h2

            className="text-3xl mb-8"

            style={{

              fontFamily: "Libre Baskerville",

            }}

          >

            Campus Dining

          </h2>



          <div className="grid md:grid-cols-2 gap-6 text-lg">



            <div className="flex items-center gap-3">

              <span className="text-[#18344f] text-xl">•</span>

              Hygienic kitchen

            </div>



            <div className="flex items-center gap-3">

              <span className="text-[#18344f] text-xl">•</span>

              Fresh ingredients daily

            </div>



            <div className="flex items-center gap-3">

              <span className="text-[#18344f] text-xl">•</span>

              Affordable student pricing

            </div>



            <div className="flex items-center gap-3">

              <span className="text-[#18344f] text-xl">•</span>

              Fast pickup service

            </div>



          </div>



        </div>



        {/* QUOTE */}



        <div className="mt-20 text-center">



          <div className="w-full h-px bg-[#ddd6cc] mb-10" />



          <p

            className="text-3xl italic text-[#18344f]"

            style={{

              fontFamily: "Libre Baskerville",

            }}

          >

            "Good food fuels great ideas."

          </p>



          <p className="mt-5 uppercase tracking-[0.35em] text-gray-500 text-sm">

            CampusConnect Dining

          </p>



          <div className="w-full h-px bg-[#ddd6cc] mt-10" />



        </div>



      </div>



    </div>



  );



}