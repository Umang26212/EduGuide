const College = require("../models/College");
const {
  calculateRecommendation,
} = require("../services/recommendationService");
const { extractPreferences } = require("../services/aiService");
const getAllColleges = async (req, res) => {
  const { search, location, collegeType, course, sort } = req.query;
  let query = {};

  if (search) {
    query.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (location) {
    query.location = {
      $regex: location,
      $options: "i",
    };
  }

  if (collegeType) {
    query.collegeType = {
      $regex: collegeType,
      $options: "i",
    };
  }

  if (course) {
    query.courses = {
      $regex: course,
      $options: "i",
    };
  }

  let collegeQuery = College.find(query);

  if (sort === "az") {
    collegeQuery = collegeQuery.sort({ name: 1 });
  }

  if (sort === "za") {
    collegeQuery = collegeQuery.sort({ name: -1 });
  }

  const colleges = await collegeQuery;
  const allCourses = await College.distinct("courses");
  const allLocations = await College.distinct("location");

  res.render("pages/colleges", {
    colleges,
    search,
    location,
    collegeType,
    course,
    sort,
    allCourses,
    allLocations,
  });
};

const getCollegeDetails = async (req, res) => {
  const { id } = req.params;

  const college = await College.findById(id);

  res.render("pages/college-details", { college });
};

const compareColleges = async (req, res) => {
  const { ids } = req.query;

  const selectedIds = ids.split(",");

  const colleges = await College.find({
    _id: { $in: selectedIds },
  });

  res.render("pages/compare", { colleges });
};

const recommendColleges = async (req, res) => {
  const { course, location, collegeType, budget, hostel } = req.query;

  // Get all colleges so we can rank them
  // instead of filtering them out first.
  const colleges = await College.find({});
  const allCourses = await College.distinct("courses");
  const allLocations = await College.distinct("location");

  let recommendedColleges = colleges.map((college) => {
    return calculateRecommendation(college, {
      course,
      location,
      collegeType,
      budget,
      hostel,
    });
  });

  // Highest matching colleges first
  recommendedColleges.sort((a, b) => b.score - a.score);

  // Remove unmatched colleges only when preferences were provided
  if (course || location || collegeType || budget || hostel) {
    recommendedColleges = recommendedColleges.filter((item) => item.score > 0);
  }

  res.render("pages/recommend", {
    colleges,
    recommendedColleges,
    course,
    location,
    collegeType,
    budget,
    hostel,
    allCourses,
    allLocations,
  });
};

const aiRecommendColleges = async (req, res) => {
  try {
    const { message, demoMode } = req.body;

    if (!demoMode && (!message || !message.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please describe what you are looking for.",
      });
    }

    const preferences = demoMode
      ? {
          course: "CSE",
          location: "Haryana",
          collegeType: "private",
          budget: 0,
          hostel: "yes",
        }
      : await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("AI_REQUEST_TIMEOUT"));
          }, 25000);

          extractPreferences(message)
            .then((result) => {
              clearTimeout(timeout);
              resolve(result);
            })
            .catch((error) => {
              clearTimeout(timeout);
              reject(error);
            });
        });

    console.log("Student message:", message);
    console.log("AI extracted preferences:", preferences);

    const colleges = await College.find({});

    let recommendedColleges = colleges.map((college) => {
      return calculateRecommendation(college, preferences);
    });

    recommendedColleges.sort((a, b) => {
      // Prioritize colleges matching the requested location.
      const locationA = a.locationMatch === true ? 1 : 0;
      const locationB = b.locationMatch === true ? 1 : 0;

      if (locationA !== locationB) {
        return locationB - locationA;
      }

      // Then prioritize colleges that match the requested course.
      const courseA = a.matches?.includes("Your preferred course is available")
        ? 1
        : 0;

      const courseB = b.matches?.includes("Your preferred course is available")
        ? 1
        : 0;

      if (courseA !== courseB) {
        return courseB - courseA;
      }

      // Then prioritize colleges within the stated budget.
      const budgetA = a.matches?.includes("The fees are within your budget")
        ? 1
        : 0;

      const budgetB = b.matches?.includes("The fees are within your budget")
        ? 1
        : 0;

      if (budgetA !== budgetB) {
        return budgetB - budgetA;
      }

      // Finally, sort by overall recommendation score.
      return b.score - a.score;
    });
    console.log(
      "Sorted AI colleges:",
      recommendedColleges.map((item) => ({
        name: item.college.name,
        locationMatch: item.locationMatch,
        score: item.score,
        matches: item.matches,
      })),
    );
    recommendedColleges = recommendedColleges.filter((item) => item.score > 0);

    return res.json({
      success: true,
      preferences,
      recommendedColleges,
    });
  } catch (error) {
    console.error("AI recommendation error:", error.message);

    if (error.message === "AI_REQUEST_TIMEOUT") {
      return res.status(504).json({
        success: false,
        message:
          "AI is taking too long to respond. Please try again in a moment.",
      });
    }

    if (error.message.includes("429")) {
      return res.status(429).json({
        success: false,
        message:
          "EduGuide AI's daily limit has been reached. Please try again after the quota resets.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Our AI recommendation service is temporarily unavailable. Please try again.",
    });
  }
};
const getAllCourses = async (req, res) => {
  const courses = await College.distinct("courses");

  res.render("pages/courses", {
    courses,
  });
};

const getDashboard = async (req, res) => {
  try {
    const totalColleges = await College.countDocuments();

    const allCourses = await College.distinct("courses");
    const allLocations = await College.distinct("location");

    res.render("pages/dashboard", {
      totalColleges,
      totalCourses: allCourses.length,
      totalLocations: allLocations.length,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).send("Unable to load the dashboard.");
  }
};

module.exports = {
  getAllColleges,
  getCollegeDetails,
  compareColleges,
  recommendColleges,
  aiRecommendColleges,
  getAllCourses,
  getDashboard,
};
