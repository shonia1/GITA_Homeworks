// models/Job.js
// Job posting schema - defines what a client posts.

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a job title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [2000, "Description cannot be more than 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Please specify a category"],
      enum: [
        "Plumbing",
        "Electrical",
        "Carpentry",
        "Painting",
        "Cleaning",
        "Gardening",
        "Other",
      ],
    },
    district: {
      type: String,
      required: [true, "Please specify a district"],
    },
    budget: {
      type: Number,
      required: [true, "Please specify a budget"],
      min: [1, "Budget must be at least 1 GEL"],
    },
    photos: {
      type: [String], // array of image URLs (stored as strings)
      default: [],
    },
    status: {
      type: String,
      enum: ["open", "assigned", "completed", "cancelled"],
      default: "open",
    },
    clientName: {
      type: String,
      required: [true, "Please add your name"],
    },
    clientPhone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  },
);

module.exports = mongoose.model("Job", jobSchema);
