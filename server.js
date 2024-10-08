require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const contactHandler = require("./apis/contact");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/api/contact", contactHandler);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
