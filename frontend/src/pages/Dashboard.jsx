import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [orders, setOrders] = useState([]);
  const currentHour = new Date().getHours();

let greeting = "Good Evening";

if (currentHour >= 5 && currentHour < 12) {
  greeting = "Good Morning";
} else if (currentHour >= 12 && currentHour < 17) {
  greeting = "Good Afternoon";
} else if (currentHour >= 17 && currentHour < 21) {
  greeting = "Good Evening";
} else {
  greeting = "Late Night Cravings? No worries, we've got you!";
}
  const [seat, setSeat] = useState(null);
  const [printRequests, setPrintRequests] = useState([]);
  const [stationeryOrders, setStationeryOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const orderRes = await API.get(
        "/orders",
        {
          headers: {
            role: localStorage.getItem("role"),
            userid: user?._id,
          },
        }
      );

      setOrders(orderRes.data);

      const seatRes =
        await API.get("/library");

      const mySeat =
        seatRes.data.find(
          (seat) =>
            seat.bookedById ===
            user?._id
        );

      setSeat(mySeat);

      const printRes =
        await API.get(
          `/print-requests/my/${user?._id}`
        );

      setPrintRequests(
        printRes.data
      );

      const stationeryRes =
        await API.get(
          `/stationery-orders/my/${user?._id}`
        );

      setStationeryOrders(
        stationeryRes.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  const modules = [
    {
      title: "Dining Services",
      desc: "Order meals and track your orders.",
      route: "/canteen",
      image: "/food-card.jpg",
    },
    {
      title: "Library",
      desc: "Book seats and search books.",
      route: "/library",
      image: "/library-card.jpg",
    },
    {
      title: "Transportation",
      desc: "View bus schedules and updates.",
      route: "/bus",
      image: "/bus-card.jpg",
    },
    {
      title: "Print Center",
      desc: "Upload and manage print requests.",
      route: "/print-upload",
      image: "/print-card.jpg",
    },
    {
      title: "Stationery Store",
      desc: "Order stationery essentials.",
      route: "/stationery",
      image: "/stationery-card.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f6f2]">

      {/* HERO */}

      <div className="relative h-[500px] overflow-hidden">

        <img
          src="/dashboard-hero.jpg"
          alt="Campus"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-center">

          <div className="max-w-7xl mx-auto w-full px-8">

            <p className="text-white/80 uppercase tracking-[0.35em] text-xs mb-4">
              Student Portal
            </p>

            <h1
              className="text-white text-6xl lg:text-7xl mb-4"
              style={{
                fontFamily:
                  "Libre Baskerville",
              }}
            >
              {greeting},
            </h1>

            <h2 className="text-white text-3xl lg:text-4xl">
              {user?.name || "Student"}
            </h2>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="max-w-7xl mx-auto px-8 py-14">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-12">

          <div>

            <h2
              className="text-4xl text-[#111111]"
              style={{
                fontFamily:
                  "Libre Baskerville",
              }}
            >
              Campus Services
            </h2>

            <p className="text-gray-500 mt-2">
              Access all student services from one portal.
            </p>

          </div>

          <button
            onClick={logout}
            className="px-6 py-3 rounded-full bg-[#18344f] text-white hover:bg-[#10263a] transition"
          >
            Logout
          </button>

        </div>

        {/* QUICK ACCESS */}

        <div className="mb-20">

          <h2
            className="text-4xl text-[#111111] mb-8"
            style={{
              fontFamily:
                "Libre Baskerville",
            }}
          >
            Quick Access
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {modules.map(
              (item, index) => (

                <div
                  key={index}
                  onClick={() =>
                    navigate(
                      item.route
                    )
                  }
                  className="
                  group
                  bg-white
                  rounded-[28px]
                  overflow-hidden
                  border border-[#ece7df]
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  cursor-pointer
                  "
                >

                  <div className="h-52 overflow-hidden">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                  </div>

                  <div className="p-6">

                    <h3 className="text-2xl font-semibold text-[#111111] mb-3">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    <button className="px-5 py-2 bg-[#18344f] text-white rounded-full text-sm hover:bg-[#10263a] transition">
                      Open Service
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* ACTIVITY + ANNOUNCEMENTS */}

        <div className="grid lg:grid-cols-3 gap-8">

        
{/* CAMPUS EXPERIENCE */}

<div className="lg:col-span-2 bg-white rounded-[28px] border border-[#ece7df] p-8 shadow-sm">

  <h2
    className="text-3xl mb-8"
    style={{
      fontFamily: "Libre Baskerville",
    }}
  >
    Campus Experience
  </h2>

  <div className="grid md:grid-cols-2 gap-8">

    <div>

      <h3 className="text-xl font-semibold mb-3 text-[#18344f]">
        Learning
      </h3>

      <p className="text-gray-600 leading-relaxed">
        Access quiet study spaces, discover library resources,
        and stay focused throughout your academic journey.
      </p>

    </div>

    <div>

      <h3 className="text-xl font-semibold mb-3 text-[#18344f]">
        Dining
      </h3>

      <p className="text-gray-600 leading-relaxed">
        Fresh meals prepared daily with quick preordering
        and convenient pickup across campus.
      </p>

    </div>

    <div>

      <h3 className="text-xl font-semibold mb-3 text-[#18344f]">
        Transportation
      </h3>

      <p className="text-gray-600 leading-relaxed">
        Stay informed with reliable campus bus schedules
        and timely transport updates.
      </p>

    </div>

    <div>

      <h3 className="text-xl font-semibold mb-3 text-[#18344f]">
        Convenience
      </h3>

      <p className="text-gray-600 leading-relaxed">
        Print documents and order stationery essentials
        whenever you need them.
      </p>

    </div>

  </div>

  <div className="my-10 border-t border-[#ece7df]" />

  <h3
    className="text-2xl mb-6"
    style={{
      fontFamily: "Libre Baskerville",
    }}
  >
    Today's Highlights
  </h3>

  <div className="grid md:grid-cols-2 gap-5">

    <div className="flex items-center gap-3">
      <span className="text-[#18344f] text-xl">•</span>
      Healthy meals available at the campus canteen
    </div>

    <div className="flex items-center gap-3">
      <span className="text-[#18344f] text-xl">•</span>
      Library study spaces open for booking
    </div>

    <div className="flex items-center gap-3">
      <span className="text-[#18344f] text-xl">•</span>
      Print services available throughout the day
    </div>

    <div className="flex items-center gap-3">
      <span className="text-[#18344f] text-xl">•</span>
      Campus buses running on regular schedule
    </div>

  </div>

  <div className="mt-10 pt-8 border-t border-[#ece7df]">

    <p
      className="text-2xl italic text-center text-[#18344f]"
      style={{
        fontFamily: "Libre Baskerville",
      }}
    >
      "Designed to make every campus day simpler."
    </p>

  </div>

</div>

          {/* ANNOUNCEMENTS */}

          <div className="bg-white rounded-[28px] border border-[#ece7df] p-8 shadow-sm">

            <h2
              className="text-3xl mb-8"
              style={{
                fontFamily:
                  "Libre Baskerville",
              }}
            >
              Announcements
            </h2>

            <div className="space-y-5">

              <div className="border-l-4 border-[#18344f] pl-4">
                <h4 className="font-medium">
                  Library Maintenance
                </h4>
                <p className="text-gray-500 text-sm">
                  This weekend from 8AM - 12PM.
                </p>
              </div>

              <div className="border-l-4 border-[#18344f] pl-4">
                <h4 className="font-medium">
                  Bus Schedule Update
                </h4>
                <p className="text-gray-500 text-sm">
                  New semester routes available.
                </p>
              </div>

              <div className="border-l-4 border-[#18344f] pl-4">
                <h4 className="font-medium">
                  Canteen Preorders
                </h4>
                <p className="text-gray-500 text-sm">
                  Preorder slots now open.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}