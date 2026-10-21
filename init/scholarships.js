const mongoose = require("mongoose");
const Scholarship = require("../models/Scholarship");

const scholarships = [

    {
        name: "Central Sector Scheme of Scholarship",
        provider: "Government of India",
        eligibility: "Meritorious students pursuing higher education",
        amount: "Up to ₹20,000 per year",
        deadline: "Check official portal",
        link: "https://scholarships.gov.in/"
    },

    {
        name: "AICTE Pragati Scholarship",
        provider: "AICTE",
        eligibility: "Eligible girl students pursuing technical education",
        amount: "Up to ₹50,000 per year",
        deadline: "Check official portal",
        link: "https://scholarships.gov.in/"
    },

    {
        name: "AICTE Saksham Scholarship",
        provider: "AICTE",
        eligibility: "Eligible students with disabilities pursuing technical education",
        amount: "Up to ₹50,000 per year",
        deadline: "Check official portal",
        link: "https://scholarships.gov.in/"
    }

];

mongoose.connect("mongodb://127.0.0.1:27017/eduguide")
    .then(async () => {

        console.log("Connected to MongoDB");

        await Scholarship.deleteMany({});

        await Scholarship.insertMany(scholarships);

        console.log("Scholarships added successfully");

        mongoose.connection.close();

    })
    .catch((err) => {
        console.log(err);
    });