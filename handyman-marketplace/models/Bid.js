// models/Bid.js
// Bid schema - craftsman's offer on a job.

const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    craftsmanName: {
      type: String,
      required: true,
    },
    craftsmanPhone: {
      type: String,
      required: true,
    },
    offeredPrice: {
      type: Number,
      required: true,
      min: [1, "Price must be at least 1 GEL"],
    },
    message: {
      type: String,
      required: false,
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Bid", bidSchema);
