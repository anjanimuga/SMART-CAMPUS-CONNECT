const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/* ROUTES */
const printRequestRoutes = require(
  "./routes/printRequest.routes"
);

const userRoutes = require(
  "./routes/user.routes"
);

const orderRoutes = require(
  "./routes/order.routes"
);

const foodRoutes = require(
  "./routes/food.routes"
);

const libraryRoutes = require(
  "./routes/library.routes"
);

const bookRoutes = require(
  "./routes/book.routes"
);

const busRoutes = require(
  "./routes/bus.routes"
);

const stationeryRoutes = require(
  "./routes/stationery.routes"
);

const stationeryOrderRoutes = require(
  "./routes/stationeryOrder.routes"
);

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "../uploads"
    )
  )
);

/* API ROUTES */

app.use("/", userRoutes);

app.use("/", orderRoutes);

app.use("/", foodRoutes);

app.use("/library", libraryRoutes);

app.use("/books", bookRoutes);

app.use("/buses", busRoutes);

app.use("/stationery", stationeryRoutes);

app.use(
  "/stationery-orders",
  stationeryOrderRoutes
);

app.use(
  "/print-requests",
  printRequestRoutes
);

module.exports = app;