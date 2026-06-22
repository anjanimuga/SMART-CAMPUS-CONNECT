import { useNavigate } from "react-router-dom";

import campusHero from "../assets/campus-hero.jpg";

export default function LandingNew() {

  const navigate = useNavigate();

  return (

    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND IMAGE */}

      <img
        src={campusHero}
        alt="Campus"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* NAVBAR */}

        <nav className="flex justify-between items-center px-8 lg:px-16 py-8">

          <h1
            className="text-white text-3xl"
            style={{
              fontFamily:
                "Libre Baskerville",
            }}
          >
            CampusConnect
          </h1>

          <div className="flex gap-4">

            <button
              onClick={() =>
                navigate("/login")
              }
              className="text-white px-5 py-2"
            >
              Login
            </button>

            <button
              onClick={() =>
                navigate("/register")
              }
              className="bg-white text-slate-900 px-6 py-3 rounded-lg font-medium"
            >
              Register
            </button>

          </div>

        </nav>

        {/* HERO */}

        <div className="flex-1 flex items-center justify-center">

          <div className="text-center max-w-4xl px-6">

            <h1
              className="text-white text-6xl lg:text-8xl mb-6"
              style={{
                fontFamily:
                  "Libre Baskerville",
              }}
            >
              CampusConnect
            </h1>

            <p className="text-white/90 text-2xl mb-6 font-medium">

              Smart Campus Utility Portal

            </p>

            <p className="text-white/80 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-10">

              Access dining, library, transport,
              printing and stationery services
              through one secure campus portal.

            </p>

            <button
              onClick={() =>
                navigate("/login")
              }
              className="bg-white text-slate-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 transition"
            >

              Access Portal

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}