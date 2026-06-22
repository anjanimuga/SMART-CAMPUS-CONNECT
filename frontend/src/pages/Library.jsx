import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  LibraryBig,
  Search,
  BookmarkCheck,
  Armchair,
} from "lucide-react";

import API from "../services/api";

import toast from "react-hot-toast";

export default function Library() {

  const navigate =
    useNavigate();

  const [seats, setSeats] =
    useState([]);

  // FETCH SEATS
  const fetchSeats =
    async () => {

      try {

        const res =
          await API.get(
            "/library"
          );

        setSeats(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchSeats();

    // LIVE REFRESH
    const interval =
      setInterval(() => {

        fetchSeats();

      }, 3000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  // BOOK SEAT
  const bookSeat =
    async (id) => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        await API.put(
          `/library/book/${id}`,
          {
            bookedBy:
              user.name,
            bookedById:
              user._id,
          }
        );

        fetchSeats();

       toast.success("Seat booked successfully")

      } catch (error) {

        console.log(error);
toast.error(
  error.response?.data?.message ||
  "Booking failed"
)
      }

    };

  const availableSeats =
  seats.filter(
    (seat) => !seat.isBooked
  ).length;

const occupiedSeats =
  seats.filter(
    (seat) => seat.isBooked
  ).length;

const usagePercentage =
  seats.length > 0
    ? Math.round(
        (occupiedSeats /
          seats.length) *
          100
      )
    : 0;

return (
  <div className="min-h-screen bg-[#f7f6f2]">

    <div className="max-w-7xl mx-auto px-8 py-12">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">

        <div>

          <h1
            className="text-5xl text-[#111111] mb-3"
            style={{
              fontFamily:
                "Libre Baskerville",
            }}
          >
            Campus Library
          </h1>

          <p className="text-gray-500 text-lg">
            Reserve seats, search books and
            manage your study experience.
          </p>

        </div>

        <div className="flex gap-4">

          <button
            onClick={() =>
              navigate("/book-search")
            }
            className="
            px-6 py-3
            rounded-full
            border
            border-[#18344f]
            text-[#18344f]
            "
          >
            Search Books
          </button>

          <button
            onClick={() =>
              navigate(
                "/my-library-bookings"
              )
            }
            className="
            px-6 py-3
            rounded-full
            bg-[#18344f]
            text-white
            "
          >
            My Bookings
          </button>

        </div>

      </div>

      {/* LIVE STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

          <p className="text-gray-500 mb-3">
            Available Seats
          </p>

          <h2 className="text-5xl font-bold text-[#18344f]">
            {availableSeats}
          </h2>

        </div>

        <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

          <p className="text-gray-500 mb-3">
            Occupied Seats
          </p>

          <h2 className="text-5xl font-bold text-[#18344f]">
            {occupiedSeats}
          </h2>

        </div>

        <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

          <p className="text-gray-500 mb-3">
            Library Usage
          </p>

          <h2 className="text-5xl font-bold text-[#18344f]">
            {usagePercentage}%
          </h2>

        </div>

      </div>

      {/* SEATS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {seats.map((seat) => (

          <div
            key={seat._id}
            className="
            bg-white
            rounded-[28px]
            border border-[#ece7df]
            p-7
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
            "
          >

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-3xl font-semibold">
                Seat {seat.seatNumber}
              </h2>

              {seat.isBooked ? (

                <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm">
                  Occupied
                </span>

              ) : (

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                  Available
                </span>

              )}

            </div>

            <p className="text-gray-500 mb-2">
              Floor {seat.floor}
            </p>

            <p className="text-gray-400 mb-6">
              {seat.section}
            </p>

            {seat.isBooked && (

              <div className="bg-[#f7f6f2] rounded-xl p-4 mb-5">

                <p className="text-sm text-gray-500">
                  Booked By
                </p>

                <p className="font-medium">
                  {seat.bookedBy}
                </p>

              </div>

            )}

            {seat.isBooked ? (

              <button
                disabled
                className="
                w-full
                py-3
                rounded-full
                bg-gray-100
                text-gray-400
                "
              >
                Unavailable
              </button>

            ) : (

              <button
                onClick={() =>
                  bookSeat(seat._id)
                }
                className="
                w-full
                py-3
                rounded-full
                bg-[#18344f]
                text-white
                hover:bg-[#10263a]
                transition
                "
              >
                Book Seat
              </button>

            )}

          </div>

        ))}

      </div>

    </div>

  </div>
);
}
