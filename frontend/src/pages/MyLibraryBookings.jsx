import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";



import API from "../services/api";

export default function MyLibraryBookings() {

  const [mySeats, setMySeats] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  // FETCH MY BOOKINGS
  const fetchMyBookings =
    async () => {

      try {

        const res =
          await API.get(
            "/library"
          );

        const filteredSeats =
          res.data.filter(
            (seat) =>
              seat.bookedById ===
              user?._id
          );

        setMySeats(
          filteredSeats
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchMyBookings();

    const interval =
      setInterval(() => {

        fetchMyBookings();

      }, 3000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // RELEASE SEAT
  const releaseSeat =
    async (id) => {

      try {

        await API.put(
          `/library/release/${id}`
        );

        fetchMyBookings();

      } catch (error) {

        console.log(error);

      }

    };

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
          My Bookings
        </h1>

        <p className="text-gray-500 text-lg">
          Manage and monitor your active
          library seat reservations.
        </p>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

          <p className="text-gray-500 mb-3">
            Active Bookings
          </p>

          <h2 className="text-5xl font-bold text-[#18344f]">
            {mySeats.length}
          </h2>

        </div>

        <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

          <p className="text-gray-500 mb-3">
            Status
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            Active
          </h2>

        </div>

        <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

          <p className="text-gray-500 mb-3">
            Auto Refresh
          </p>

          <h2 className="text-3xl font-bold text-[#18344f]">
            Live
          </h2>

        </div>

      </div>

      {/* EMPTY STATE */}

      {mySeats.length === 0 ? (

        <div
          className="
          bg-white
          rounded-[28px]
          border border-[#ece7df]
          p-16
          text-center
          "
        >

          <h2
            className="text-4xl mb-4"
            style={{
              fontFamily:
                "Libre Baskerville",
            }}
          >
            No Active Bookings
          </h2>

          <p className="text-gray-500">
            You currently don't have any
            reserved library seats.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-8">

          {mySeats.map((seat) => (

            <div
              key={seat._id}
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
                  Seat {seat.seatNumber}
                </h2>

                <span
                  className="
                  bg-green-100
                  text-green-700
                  px-4 py-2
                  rounded-full
                  text-sm
                  "
                >
                  Active
                </span>

              </div>

              <p className="text-gray-500 mb-2">
                Floor {seat.floor}
              </p>

              <p className="text-gray-400 mb-8">
                {seat.section}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">

                <div
                  className="
                  bg-[#f7f6f2]
                  rounded-2xl
                  p-4
                  "
                >

                  <p className="text-xs text-gray-400 mb-2">
                    BOOKED AT
                  </p>

                  <p className="text-sm font-medium">
                    {new Date(
                      seat.bookedAt
                    ).toLocaleString()}
                  </p>

                </div>

                <div
                  className="
                  bg-[#f7f6f2]
                  rounded-2xl
                  p-4
                  "
                >

                  <p className="text-xs text-gray-400 mb-2">
                    EXPIRES
                  </p>

                  <p className="text-sm font-medium">
                    {new Date(
                      seat.expiryTime
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  releaseSeat(
                    seat._id
                  )
                }
                className="
                w-full
                py-3
                rounded-full
                bg-red-500
                text-white
                hover:bg-red-600
                transition
                "
              >
                Release Seat
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>

);

}