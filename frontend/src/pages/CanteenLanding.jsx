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
              className="text-white text-6xl lg:text-8xl mb-6"
              style={{
                fontFamily: "Libre Baskerville",
              }}
            >
              Campus
              <br />
              Canteen
            </h1>

            <p className="text-white/90 text-xl max-w-xl leading-relaxed mb-10">
              Fresh meals, quick pickup and a better
              dining experience for students.
            </p>

            <button
              onClick={() =>
                navigate("/canteen-menu")
              }
              className="
              bg-[#18344f]
              text-white
              px-8
              py-4
              rounded-full
              text-lg
              hover:bg-[#10263a]
              transition
              "
            >
              Explore Menu →
            </button>

          </div>

        </div>

      </div>

      {/* LIVE STATUS */}

      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="flex items-center gap-3 mb-10">

          <span className="relative flex h-3 w-3">

            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>

            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>

          </span>

          <span className="text-green-600 font-medium">
            LIVE CANTEEN STATUS
          </span>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="
bg-white
rounded-[28px]
border border-[#ece7df]
p-8
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
">

            <p className="text-gray-500 mb-2">
              Orders Today
            </p>

            <h3 className="text-5xl font-bold text-[#18344f]">
              148
            </h3>

            <p className="text-sm text-gray-400 mt-3">
              Updated just now
            </p>

          </div>

          <div className="
bg-white
rounded-[28px]
border border-[#ece7df]
p-8
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
">

            <p className="text-gray-500 mb-2">
              Preparing
            </p>

            <h3 className="text-5xl font-bold text-[#18344f]">
              12
            </h3>

            <p className="text-sm text-gray-400 mt-3">
              Current kitchen load
            </p>

          </div>

          <div className="
bg-white
rounded-[28px]
border border-[#ece7df]
p-8
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
">

            <p className="text-gray-500 mb-2">
              Ready For Pickup
            </p>

            <h3 className="text-5xl font-bold text-[#18344f]">
              7
            </h3>

            <p className="text-sm text-gray-400 mt-3">
              Waiting at counter
            </p>

          </div>

        </div>

      </div>

      {/* RECENT ACTIVITY */}

      <div className="max-w-7xl mx-auto px-8 pb-20">

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="
bg-white
rounded-[28px]
border border-[#ece7df]
p-8
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
">

            <h2
              className="text-4xl mb-8"
              style={{
                fontFamily: "Libre Baskerville",
              }}
            >
              Recent Orders
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">

                <div>

                  <h4 className="font-medium">
                    Token #A127
                  </h4>

                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
  Ready for Pickup
</span>

                </div>

                <span className="text-gray-400">
                  2 mins ago
                </span>

              </div>

              <div className="flex justify-between">

                <div>

                  <h4 className="font-medium">
                    Token #A126
                  </h4>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
  Preparing
</span>

                </div>

                <span className="text-gray-400">
                  4 mins ago
                </span>

              </div>

              <div className="flex justify-between">

                <div>

                  <h4 className="font-medium">
                    Token #A125
                  </h4>

                 <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
  Completed
</span>
                  

                </div>

                <span className="text-gray-400">
                  6 mins ago
                </span>

              </div>

            </div>

          </div>

          <div className="
bg-white
rounded-[28px]
border border-[#ece7df]
p-8
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
">

            <h2
              className="text-4xl mb-8"
              style={{
                fontFamily: "Libre Baskerville",
              }}
            >
              Today's Specials
            </h2>

            <div className="space-y-4">

              <div className="border-l-4 border-[#18344f] pl-4">
                Chicken Biryani
              </div>

              <div className="border-l-4 border-[#18344f] pl-4">
                Veg Fried Rice
              </div>

              <div className="border-l-4 border-[#18344f] pl-4">
                Cold Coffee
              </div>

              <div className="border-l-4 border-[#18344f] pl-4">
                Paneer Wrap
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}