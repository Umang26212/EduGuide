const Scholarship = require("../models/Scholarship");

const getAllScholarships = async (req, res) => {

    const scholarships = await Scholarship.find({});

    res.render("pages/scholarships", {
        scholarships
    });

};

module.exports = {
    getAllScholarships
};