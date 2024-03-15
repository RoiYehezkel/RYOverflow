const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "welcome" });
});

app.use((req, res, next) => {
  const error = new Error("Could not find this route.");
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(process.env.MONGO_URI_DEV)
  .then(() => {
    app.listen(8080, () => console.log("Server listens on port 8080."));
  })
  .catch((error) => {
    console.log(error);
  });
