const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const collegeRoutes = require("./routes/college");
const {
  recommendColleges,
  getAllCourses,
  getDashboard,
} = require("./controllers/collegeController");
const { getAllScholarships } = require("./controllers/scholarshipController");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

app.set("view engine", "ejs");

app.use(express.static("public"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.render("pages/home");
});
app.get("/dashboard", getDashboard);

app.get("/recommend", recommendColleges);
app.get("/courses", getAllCourses);
app.get("/scholarships", getAllScholarships);

app.use("/colleges", collegeRoutes);

app.listen(port, () => {
  console.log(`EduGuide server is running on port ${port}`);
});
