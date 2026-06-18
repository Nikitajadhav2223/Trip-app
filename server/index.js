// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // Middlewares
// // app.use(cors({ origin: "http://localhost:3000" }));

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://trrip-itinerary-app.netlify.app",
//     ],
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use("/uploads", express.static("uploads")); // serve uploaded files

// // Database
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ DB Error:", err));

// // Routes
// app.use("/api/auth",      require("./routes/authRoutes"));
// app.use("/api/upload",    require("./routes/uploadRoutes"));
// app.use("/api/itinerary", require("./routes/itineraryRoutes"));

// // Health check
// // app.get("/", (req, res) => res.json({ message: "Trrip API running 🚀" }));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));

// app.get("/health", (req, res) => {
//   res.status(200).json({
//     status: "ok",
//     message: "API working"
//   });
// });



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARES ---------------- */

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://trrip-itinerary-app.netlify.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ---------------- DATABASE ---------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Error:", err));

/* ---------------- ROUTES ---------------- */

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/itinerary", require("./routes/itineraryRoutes"));



/* ROOT ROUTE  */
app.get("/", (req, res) => {
  res.json({
    message: "Trrip API running 🚀"
  });
});

/* ---------------- HEALTH CHECK ---------------- */

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API working 🚀",
  });
});

/* ---------------- START SERVER (IMPORTANT FOR RENDER) ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});