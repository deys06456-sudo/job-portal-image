const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        // Job Title
        title: {
            type: String,
            required: true,
            trim: true
        },

        // Job Description
        description: {
            type: String,
            required: true,
            trim: true
        },

        // Company Name
        companyName: {
            type: String,
            required: true,
            trim: true
        },

        // Image 
        image: {
            type: String,
            required: false,
            default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        },

        // Job Location
        location: {
            type: String,
            required: true,
            trim: true
        },

        // Salary
        salary: {
            type: Number,
            required: true
        },

        // Experience
        experience: {
            type: String,
            required: true
        },

        // Employment Type
        employmentType: {
            type: String,
            required: true,
            enum: [
                "Full Time",
                "Part Time",
                "Internship",
                "Contract"
            ]
        },

        // Skills
        skills: {
            type: [String],
            required: true
        },

        // Qualification
        qualification: {
            type: String,
            required: true
        },

        // Application Deadline
        applicationDeadline: {
            type: Date,
            required: true
        },

        // Job Status
        status: {
            type: String,
            required: true,
            enum: [
                "Active",
                "Closed",
                "Draft"
            ],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;