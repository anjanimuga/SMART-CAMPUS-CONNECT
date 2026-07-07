import {
  useEffect,
  useState,
  useContext,
} from "react";

import { motion } from "framer-motion";

import {
  ShoppingBag,
  ClipboardList,
  Search,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import { CartContext } from "../context/CartContext";

export default function Canteen() {

  const navigate = useNavigate();

  const { addToCart } =
    useContext(CartContext);

  const [foods, setFoods] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
  useState("All");

  const [selectedFlavours,
    setSelectedFlavours] =
    useState({});

  const promoTexts = [
  "🍽 Freshly Prepared Every Day",
  "🚀 Skip The Queue, Order Online",
  "🥤 Refreshing Drinks & Thickshakes",
  "⭐ Campus Students' Favourite Meals",
];

const placeholders = [

  "Search Chicken Biryani...",

  "Search Cold Coffee...",

  "Search French Fries...",

  "Search Sandwich...",

  "Search Thickshakes...",

];

const [placeholderIndex,
setPlaceholderIndex] =
useState(0);
const [promoIndex, setPromoIndex] = useState(0);

  const [activeOrder, setActiveOrder] =
  useState(null);

  // FETCH FOODS
useEffect(() => {

  let mounted = true;

  const loadFoods = async () => {
    try {
      const res = await API.get("/foods");

      if (mounted) {
        setFoods(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const promoInterval = setInterval(() => {
  setPromoIndex((prev) => (prev + 1) % promoTexts.length);
}, 2500);


const placeholderInterval = setInterval(() => {

  setPlaceholderIndex((prev) =>
    (prev + 1) % placeholders.length
  );

}, 2000);

  loadFoods();
  fetchActiveOrder();

  return () => {
    mounted = false;
    clearInterval(placeholderInterval);

    clearInterval(promoInterval);
  };

}, []);



    const fetchActiveOrder =
  async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      const res =
        await API.get(
          "/orders/active",
          {
            headers: {
              userid: user._id,
            },
          }
        );

      setActiveOrder(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  // FILTER SEARCH
 const categories = [
  "All",
  ...new Set(
    foods.map(
      (food) => food.category
    )
  ),
];

const filteredFoods =
foods.filter((food)=>{

  const matchesSearch =
    food.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );

  const matchesCategory =

    selectedCategory ===
    "All"

      ? true

      : food.category ===
        selectedCategory;

  return (

    matchesSearch &&
    matchesCategory

  );

});

  

  // ADD TO CART
  const handleAddToCart =
    (food) => {

      if (
        food.stock <= 0
      ) {

        toast.error(
          "Item out of stock"
        );

        return;

      }

      const item = {
        ...food,
        quantity: 1,
      };

      if (
        food.category
          .toLowerCase()
          .includes(
            "thickshake"
          )
      ) {

        item.flavour =
          selectedFlavours[
            food._id
          ] || "Cold Coffee";

      }

      addToCart(item);

      toast.success(
        `${food.name} added to cart`
      );

    };

  // CHANGE FLAVOUR
  const handleFlavourChange =
    (id, flavour) => {

      setSelectedFlavours({
        ...selectedFlavours,
        [id]: flavour,
      });

    };

  return (

    <div className="min-h-screen bg-[#faf7f2] px-8 py-10 font-['Outfit'] overflow-hidden">

      {/* BACKGROUND BLURS */}

      <div className="fixed top-[-150px] right-[-100px] w-[420px] h-[420px] bg-orange-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="fixed bottom-[-200px] left-[-100px] w-[420px] h-[420px] bg-amber-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}

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
          className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 mb-14"
        >

          <div>

            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-[#ece7df] shadow-sm mb-6">

              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />

              <p className="text-[#5e5246] font-medium text-sm">
                Premium Campus Café
              </p>

            </div>

           <h1
  className="text-5xl text-[#111111] mb-4"
  style={{
    fontFamily:
      "Libre Baskerville",
  }}
>

              Campus Canteen

            </h1>

            <p className="text-[#6b6258] text-xl leading-relaxed max-w-2xl">

              Fresh meals, premium beverages and student favourites —
              beautifully curated for your campus experience.

            </p>

           <motion.p
  key={promoIndex}
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.4 }}
  className="text-[#18344f] text-lg font-medium mt-6 mb-8"
>
  {promoTexts[promoIndex]}
</motion.p>

          </div>

          {/* BUTTONS */}

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={() =>
                navigate("/orders")
              }
              className="flex items-center gap-3 bg-white border border-[#ece7df] text-[#1f1b16] px-6 py-4 rounded-full hover:shadow-xl transition duration-300 hover:-translate-y-1"
            >

              <ClipboardList size={20} />

              View Orders

            </button>

            <button
              onClick={() =>
                navigate("/cart")
              }
              className="flex items-center gap-3 bg-[#1f1b16] text-white px-6 py-4 rounded-full hover:opacity-90 transition duration-300 shadow-xl hover:-translate-y-1"
            >

              <ShoppingBag size={20} />

              View Cart

            </button>

          </div>

        </motion.div>

        {activeOrder ? (

  <div className="mb-8 bg-white border border-[#ece7df] rounded-[28px] p-6 shadow-sm">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-sm text-gray-500 mb-2">

          My Current Order

        </p>

        <h2 className="text-2xl font-bold">

          Token #{activeOrder.tokenNumber}

        </h2>

        <p className="text-gray-600 mt-2">

          Status:
          {" "}
          <span className="font-semibold">

            {activeOrder.status}

          </span>

        </p>

        <p className="text-gray-500">

          Pickup:
          {" "}
          {activeOrder.pickupTime}

        </p>

      </div>

      <button
        onClick={() =>
          navigate("/orders")
        }
        className="bg-[#18344f] text-white px-5 py-3 rounded-full"
      >

        View Orders

      </button>

    </div>

  </div>

) : (

  <div className="mb-8 bg-white border border-[#ece7df] rounded-[28px] p-6">

    <h2 className="text-xl font-semibold">

      🍽 No Active Orders

    </h2>

    <p className="text-gray-500 mt-2">

      Browse today's menu and place your first order.

    </p>

  </div>

)}



        {/* SEARCH */}

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
            delay: 0.1,
          }}
          className="relative mb-14"
        >

          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8c8378]"
            size={20}
          />

          <input
            type="text"
           placeholder={
  placeholders[
    placeholderIndex
  ]
}
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full bg-white border border-[#ece7df] rounded-[24px] pl-14 pr-6 py-5 outline-none text-[#1f1b16] placeholder:text-[#8c8378] shadow-sm focus:ring-4 focus:ring-orange-100 transition"
          />

        </motion.div>


        <div className="grid md:grid-cols-3 gap-6 mb-12">

  <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

    <p className="text-gray-500 mb-3">
      Menu Items
    </p>

    <h2 className="text-5xl font-bold text-[#18344f]">
      {foods.length}
    </h2>

  </div>

  <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

    <p className="text-gray-500 mb-3">
      Available Items
    </p>

    <h2 className="text-5xl font-bold text-green-600">
      {
        foods.filter(
          (f) => f.stock > 0
        ).length
      }
    </h2>

  </div>

  <div className="bg-white rounded-[28px] border border-[#ece7df] p-8">

    <p className="text-gray-500 mb-3">
      Out Of Stock
    </p>

    <h2 className="text-5xl font-bold text-red-500">
      {
        foods.filter(
          (f) => f.stock <= 0
        ).length
      }
    </h2>

  </div>

</div>


{/* CATEGORY TABS */}

<div className="flex flex-wrap gap-3 mb-10">

  {categories.map((category) => (

    <button
      key={category}
      onClick={() =>
        setSelectedCategory(category)
      }
      className={`px-6 py-3 rounded-full transition font-medium ${
        selectedCategory === category
          ? "bg-[#18344f] text-white"
          : "bg-white border border-[#ece7df] text-[#18344f] hover:bg-[#f7f6f2]"
      }`}
    >
      {category}
    </button>

  ))}

</div>

        {/* FOOD GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {

            loading ? (

              [...Array(6)].map(
                (_, index) => (

                  <div
                    key={index}
                    className="bg-white border border-[#ece7df] rounded-[32px] overflow-hidden animate-pulse"
                  >

                    <div className="w-full h-[260px] bg-[#ece7df]" />

                    <div className="p-7">

                      <div className="h-8 bg-[#ece7df] rounded-full w-28 mb-6" />

                      <div className="h-8 bg-[#ece7df] rounded-xl w-2/3 mb-5" />

                      <div className="h-6 bg-[#ece7df] rounded-xl w-1/3 mb-6" />

                      <div className="h-5 bg-[#ece7df] rounded-xl w-1/2 mb-8" />

                      <div className="h-14 bg-[#ece7df] rounded-2xl" />

                    </div>

                  </div>

                )
              )

            ) : filteredFoods.length === 0 ? (

  <div className="col-span-full text-center py-20">

    <h2 className="text-3xl font-semibold text-[#18344f]">
      No items found
    </h2>

    <p className="text-gray-500 mt-3">
      Try another search or category.
    </p>

  </div>

) : (


              filteredFoods.map(
                (
                  food,
                  index
                ) => (

                  <motion.div
                    key={food._id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        index * 0.05,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className="group bg-white border border-[#ececec] rounded-[32px] overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.10)]"
                  >

                    {/* IMAGE */}

                    <div className="relative w-full h-[260px] overflow-hidden bg-[#f2ede6]">

                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                     <img
  src={
    food.image &&
    food.image.startsWith("http")
      ? food.image
      : `/food/${food.image}`
  }
  alt={food.name}
  loading="lazy"
  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      {/* STOCK BADGE */}

                      {food.stock <= 0 && (

                        <div className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">

                          Out Of Stock

                        </div>

                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="p-7">

                      {/* CATEGORY */}

                      <div className="inline-flex px-4 py-2 rounded-full bg-[#f7f2eb] text-[#8a7864] text-sm font-medium mb-5">

                        {food.category}

                      </div>

                      {/* TITLE */}

                      <div className="flex justify-between items-start gap-4 mb-4">

                        <h2 className="text-[30px] font-black text-[#1f1b16] leading-tight">

                          {food.name}

                        </h2>

                        <p className="text-[26px] font-black text-[#1f1b16] whitespace-nowrap">

                          ₹{food.price}

                        </p>

                      </div>

                      {/* STOCK */}

                      <p className="text-[#8c8378] mb-6">

                        Available Stock:
                        {" "}
                        <span className="font-semibold text-[#1f1b16]">
                          {food.stock}
                        </span>

                      </p>

                      {/* FLAVOURS */}

                      {food.category
                        .toLowerCase()
                        .includes(
                          "thickshake"
                        ) && (

                        <select
                          onChange={(e) =>
                            handleFlavourChange(
                              food._id,
                              e.target.value
                            )
                          }
                          className="w-full bg-[#faf7f2] border border-[#ece7df] rounded-2xl px-5 py-4 mb-6 outline-none text-[#1f1b16]"
                        >

                          <option>
                            Cold Coffee
                          </option>

                          <option>
                            Matcha
                          </option>

                          <option>
                            Strawberry
                          </option>

                          <option>
                            Caramel
                          </option>

                        </select>

                      )}

                      {/* BUTTON */}

                      {

                        food.stock <= 0 ? (

                          <button
                            disabled
                            className="w-full bg-red-500 text-white py-4 rounded-2xl cursor-not-allowed font-semibold"
                          >

                            Out Of Stock

                          </button>

                        ) : (

                          <button
                            onClick={() =>
                              handleAddToCart(
                                food
                              )
                            }
                            className="w-full bg-[#111111] text-white py-4 rounded-2xl font-semibold transition duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-black"
                          >

                            Add To Cart

                          </button>

                        )

                      }

                    </div>

                  </motion.div>

                )
              )

            )

          }

        </div>

      </div>

    </div>

  );

}