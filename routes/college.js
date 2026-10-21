const express = require("express");

const router = express.Router();

const { getAllColleges,getCollegeDetails,compareColleges,aiRecommendColleges } = require("../controllers/collegeController");

router.get("/", getAllColleges);
router.get("/compare", compareColleges);
router.post("/ai-recommend", aiRecommendColleges);
router.get("/:id", getCollegeDetails);
router.get("/courses", async (req, res) => {

    const allCourses = await College.distinct("courses");

    res.render("pages/courses", {
        courses: allCourses
    });

});

module.exports = router;