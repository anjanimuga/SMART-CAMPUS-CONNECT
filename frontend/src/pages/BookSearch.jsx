import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import { Search } from "lucide-react";

import API from "../services/api";

export default function BookSearch() {

  const [books, setBooks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // FETCH BOOKS
  const fetchBooks =
    async () => {

      try {

        const res =
          await API.get(
            "/books"
          );

        setBooks(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchBooks();

  }, []);

  // FILTER BOOKS
  const filteredBooks =
    search.trim() === ""
      ? []
      : books.filter(
          (book) =>
            book.bookName
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );

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
          Book Search
        </h1>

        <p className="text-gray-500 text-lg">
          Find books instantly and locate them
          inside the campus library.
        </p>

      </div>

      {/* SEARCH */}

      <div className="relative mb-14">

        <Search
          size={20}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search by book name..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
          w-full
          bg-white
          border
          border-[#ece7df]
          rounded-full
          pl-14
          pr-6
          py-5
          outline-none
          text-lg
          "
        />

      </div>

      {/* EMPTY */}

      {search.trim() === "" ? (

        <div className="
        bg-white
        rounded-[28px]
        border border-[#ece7df]
        p-16
        text-center
        ">

          <h2
            className="text-4xl mb-4"
            style={{
              fontFamily:
                "Libre Baskerville",
            }}
          >
            Search For A Book
          </h2>

          <p className="text-gray-500">
            Enter a book title above to
            locate it inside the library.
          </p>

        </div>

      ) : filteredBooks.length === 0 ? (

        <div className="
        bg-white
        rounded-[28px]
        border border-[#ece7df]
        p-16
        text-center
        ">

          <h2
            className="text-4xl mb-4"
            style={{
              fontFamily:
                "Libre Baskerville",
            }}
          >
            No Books Found
          </h2>

          <p className="text-gray-500">
            Try another book title.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-8">

          {filteredBooks.map((book) => (

            <div
              key={book._id}
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

              <h2
                className="text-3xl mb-3"
                style={{
                  fontFamily:
                    "Libre Baskerville",
                }}
              >
                {book.bookName}
              </h2>

              <p className="text-gray-500 mb-2">
                Author: {book.author}
              </p>

              <p className="text-gray-500 mb-8">
                Department: {book.department}
              </p>

              <div className="grid grid-cols-3 gap-4">

                <div className="
                bg-[#f7f6f2]
                rounded-2xl
                p-4
                text-center
                ">

                  <p className="text-xs text-gray-400 mb-2">
                    FLOOR
                  </p>

                  <h3 className="text-2xl font-semibold">
                    {book.floor}
                  </h3>

                </div>

                <div className="
                bg-[#f7f6f2]
                rounded-2xl
                p-4
                text-center
                ">

                  <p className="text-xs text-gray-400 mb-2">
                    SECTION
                  </p>

                  <h3 className="text-xl font-semibold">
                    {book.section}
                  </h3>

                </div>

                <div className="
                bg-[#f7f6f2]
                rounded-2xl
                p-4
                text-center
                ">

                  <p className="text-xs text-gray-400 mb-2">
                    SHELF
                  </p>

                  <h3 className="text-2xl font-semibold">
                    {book.shelf}
                  </h3>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>

);
}