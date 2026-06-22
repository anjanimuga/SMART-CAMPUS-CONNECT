import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import API from "../services/api";
import toast from "react-hot-toast";

import campusHero from "../assets/campus-hero.jpg";

export default function Register() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      branch: "",
      year: "",
      rollNo: "",
      phone: "",
    });

  const handleChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/register",
          form
        );

        toast.success(
          "Registration Successful"
        );

        navigate(
          "/login"
        );

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Registration Failed"
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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">

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
          className="w-full max-w-3xl"
        >

          <div className="text-center mb-10">

            <p className="text-white/70 uppercase tracking-[0.35em] text-xs mb-5">

              Student Registration

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

            <p className="text-white/80 text-lg">

              Create Your Student Account

            </p>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={
                handleChange
              }
              className="px-5 py-4 rounded-md bg-white/95 text-black outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={
                handleChange
              }
              className="px-5 py-4 rounded-md bg-white/95 text-black outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={
                handleChange
              }
              className="px-5 py-4 rounded-md bg-white/95 text-black outline-none"
              required
            />

            <input
              type="text"
              name="branch"
              placeholder="Branch"
              onChange={
                handleChange
              }
              className="px-5 py-4 rounded-md bg-white/95 text-black outline-none"
              required
            />

            <input
              type="text"
              name="year"
              placeholder="Year"
              onChange={
                handleChange
              }
              className="px-5 py-4 rounded-md bg-white/95 text-black outline-none"
              required
            />

            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              onChange={
                handleChange
              }
              className="px-5 py-4 rounded-md bg-white/95 text-black outline-none"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={
                handleChange
              }
              className="md:col-span-2 px-5 py-4 rounded-md bg-white/95 text-black outline-none"
              required
            />

            <button
              type="submit"
              className="md:col-span-2 bg-white text-black py-4 rounded-md font-semibold hover:bg-slate-100 transition"
            >

              Create Account

            </button>

          </form>

          <button
            onClick={() =>
              navigate(
                "/login"
              )
            }
            className="mt-6 w-full text-white/80 hover:text-white transition"
          >

            Already have an account? Login

          </button>

        </motion.div>

      </div>

    </div>

  );

}