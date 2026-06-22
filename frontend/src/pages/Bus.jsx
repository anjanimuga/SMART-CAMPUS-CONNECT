import {
  useEffect,
  useState,
} from "react";

import { Clock3 } from "lucide-react";

import API from "../services/api";

export default function Bus() {

  const [buses, setBuses] =
    useState([]);

  // FETCH BUSES
  const fetchBuses =
    async () => {

      try {

        const res =
          await API.get(
            "/buses"
          );

        setBuses(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchBuses();

    const interval =
      setInterval(() => {

        fetchBuses();

      }, 5000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  const onTimeBuses =
  buses.filter(
    (bus) =>
      bus.status === "On Time"
  ).length;

const delayedBuses =
  buses.filter(
    (bus) =>
      bus.status === "Delayed"
  ).length;

 return (

<div className="min-h-screen bg-[#f7f6f2]">

  <div className="max-w-7xl mx-auto px-8 py-12">

    {/* HEADER */}

    <div className="mb-12">

      <h1
        className="text-5xl text-[#111111] mb-3"
        style={{
          fontFamily:
            "Libre Baskerville",
        }}
      >
        Campus Transport
      </h1>

      <p className="text-gray-500 text-lg">
        View bus schedules and live
        transport updates across campus.
      </p>

    </div>

    {/* LIVE STATS */}

    <div className="grid md:grid-cols-3 gap-6 mb-12">

      <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

        <p className="text-gray-500 mb-3">
          Total Buses
        </p>

        <h2 className="text-5xl font-bold text-[#18344f]">
          {buses.length}
        </h2>

      </div>

      <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

        <p className="text-gray-500 mb-3">
          On Time
        </p>

        <h2 className="text-5xl font-bold text-green-600">
          {onTimeBuses}
        </h2>

      </div>

      <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

        <p className="text-gray-500 mb-3">
          Delayed
        </p>

        <h2 className="text-5xl font-bold text-yellow-600">
          {delayedBuses}
        </h2>

      </div>

    </div>

    {/* BUS CARDS */}

    <div className="grid md:grid-cols-2 gap-8">

      {buses.map((bus) => (

        <div
          key={bus._id}
          className="
          bg-white
          rounded-[28px]
          border border-[#ece7df]
          p-8
          shadow-sm
          hover:shadow-xl
          transition-all
          duration-300
          "
        >

          <div className="flex justify-between items-center mb-6">

            <h2
              className="text-3xl"
              style={{
                fontFamily:
                  "Libre Baskerville",
              }}
            >
              Bus {bus.busNumber}
            </h2>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium
              ${
                bus.status === "On Time"
                  ? "bg-green-100 text-green-700"
                  : bus.status === "Delayed"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {bus.status}
            </span>

          </div>

          <p className="text-gray-500 mb-8">

            Route: {bus.route}

          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">

            <div className="
            bg-[#f7f6f2]
            rounded-2xl
            p-4
            ">

              <div className="flex items-center gap-2 mb-2">

                <Clock3 size={16} />

                <span className="text-xs text-gray-400">
                  DEPARTURE
                </span>

              </div>

              <h3 className="text-2xl font-semibold">
                {bus.departureTime}
              </h3>

            </div>

            <div className="
            bg-[#f7f6f2]
            rounded-2xl
            p-4
            ">

              <div className="flex items-center gap-2 mb-2">

                <Clock3 size={16} />

                <span className="text-xs text-gray-400">
                  ARRIVAL
                </span>

              </div>

              <h3 className="text-2xl font-semibold">
                {bus.arrivalTime}
              </h3>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

</div>

);

}