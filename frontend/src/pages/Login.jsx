import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import campusHero from "../assets/campus-hero.jpg";

export default function Login() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await API.post(
            "/login",
            {
              email:
                formData.email,
              password:
                formData.password,
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "role",
          res.data.role
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        if (
          res.data.role ===
          "admin"
        ) {

          navigate(
            "/admin"
          );

        } else {

          navigate(
            "/dashboard"
          );

        }

      } catch (error) {

        console.log(
          error.response?.data ||
          error.message
        );

        alert(
          error.response?.data?.message ||
          "Authentication failed"
        );

      }

    };

  return (

    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}

      <img
        src={campusHero}
        alt="Campus"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />

      {/* CONTENT */}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="w-full max-w-md"
        >

          <form
            onSubmit={
              handleSubmit
            }
            className="text-center"
          >

            <p className="text-white/70 uppercase tracking-[0.35em] text-xs mb-5">

              Student Portal

            </p>

            <h1
              className="text-white text-5xl lg:text-6xl mb-4"
              style={{
                fontFamily:
                  "Libre Baskerville",
              }}
            >

              CampusConnect

            </h1>

            <p className="text-white/80 text-lg mb-10">

              Student Portal Access

            </p>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={
                handleChange
              }
              className="w-full mb-4 px-5 py-4 rounded-md bg-white/95 text-black outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={
                handleChange
              }
              className="w-full mb-6 px-5 py-4 rounded-md bg-white/95 text-black outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-white text-black py-4 rounded-md font-semibold hover:bg-slate-100 transition"
            >

              Login

            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/register"
                )
              }
              className="mt-6 text-white/80 hover:text-white transition"
            >

              Don't have an account? Register

            </button>

          </form>

        </motion.div>

      </div>

    </div>

  );

}