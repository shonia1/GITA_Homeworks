// routes/bidRoutes.js
// Defines routes for bid-related endpoints.

const express = require("express");
const { createBid, getBidsByJob } = require("../controllers/bidController");

const router = express.Router();

// POST a new bid
router.route("/").post(createBid);

// GET all bids for a specific job
router.route("/job/:jobId").get(getBidsByJob);

module.exports = router;
