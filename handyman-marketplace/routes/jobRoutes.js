// routes/jobRoutes.js
// Defines all routes for job-related endpoints.

const express = require('express');
const {
  createJob,
  getJobs,
  getJob,
  updateJobStatus,
  deleteAllJobs, // optional: development only
} = require('../controllers/jobController');

const router = express.Router();

// ──────────────────────────────────────────────
// GET  /api/jobs  → all jobs (with filtering, sorting)
// POST /api/jobs  → create a new job
// ──────────────────────────────────────────────
router.route('/')
  .get(getJobs)
  .post(createJob);

// ──────────────────────────────────────────────
// GET    /api/jobs/:id  → single job by ID
// PATCH  /api/jobs/:id  → update job status (open/closed etc.)
// ──────────────────────────────────────────────
router.route('/:id')
  .get(getJob)
  .patch(updateJobStatus);

// (Optional) DELETE all jobs – dev use only
// router.route('/delete-all').delete(deleteAllJobs);

module.exports = router;