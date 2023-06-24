const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoute = require("./routes/taskRoute");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-task-app-api-qe2f.onrender.com",
    ],
  })
);
app.use("/api/tasks", taskRoute);

// const logger = (req, res, next) => {
//   console.log("Middleware Ran");
//   console.log(req.method);
//   next(); // runs the next method
// };

//Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

//connectDB();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
