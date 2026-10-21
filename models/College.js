const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    description: String,

    collegeType: String,

    courses: [String],

    entranceExams: [String],

    fees: Number,

    hostelAvailable: Boolean,

    website: String,

    admissionLink: String
});

const College = mongoose.model("College", collegeSchema);

module.exports = College;