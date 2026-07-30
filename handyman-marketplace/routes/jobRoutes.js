// routes/jobRoutes.js
// Defines routes for job-related endpoints.

const express = require("express");
const { createJob, getJobs, getJob } = require("../controllers/jobController");

const router = express.Router();

// GET all jobs & POST a new job
router.route("/").get(getJobs).post(createJob);

// GET a single job by ID
router.route("/:id").get(getJob);

module.exports = router;
