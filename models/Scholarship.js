const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    provider: {
        type: String,
        required: true
    },

    eligibility: {
        type: String,
        required: true
    },

    amount: {
        type: String,
        required: true
    },

    deadline: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    }

});

const Scholarship = mongoose.model(
    "Scholarship",
    scholarshipSchema
);

module.exports = Scholarship;