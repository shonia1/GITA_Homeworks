// controllers/bidController.js
// Handles CRUD operations for Bid model.

const Bid = require("../models/Bid");
const Job = require("../models/Job");

// @desc    Create a new bid for a job
// @route   POST /api/bids
// @access  Public
exports.createBid = async (req, res) => {
  try {
    // Check if the job exists
    const job = await Job.findById(req.body.job);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: "Job not found with this ID",
      });
    }

    // Create the bid
    const bid = await Bid.create(req.body);
    res.status(201).json({
      success: true,
      data: bid,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get all bids for a specific job
// @route   GET /api/bids/job/:jobId
// @access  Public
exports.getBidsByJob = async (req, res) => {
  try {
    const bids = await Bid.find({ job: req.params.jobId }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      count: bids.length,
      data: bids,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
