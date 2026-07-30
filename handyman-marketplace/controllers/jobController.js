// controllers/jobController.js
// Handles CRUD operations for Job model with Telegram notifications.

const Job = require("../models/Job");
const bot = require("../config/telegram"); // <-- ბოტის ინიციალიზაცია (config/telegram.js)

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Public
exports.createJob = async (req, res) => {
  try {
    // 1. Job-ის შექმნა
    const job = await Job.create(req.body);
    console.log("✅ Job created with ID:", job._id);

    // 2. Telegram-ის კონფიგურაციის შემოწმება
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log("🔍 TELEGRAM_BOT_TOKEN:", token ? "✅ EXISTS" : "❌ MISSING");
    console.log("🔍 TELEGRAM_CHAT_ID:", chatId ? `✅ ${chatId}` : "❌ MISSING");

    if (token && chatId) {
      // 3. შეტყობინების ტექსტი
      const message = `
🔨 *New Job Posted!*
📌 *Title:* ${job.title}
📂 *Category:* ${job.category}
📍 *District:* ${job.district}
💰 *Budget:* ${job.budget} GEL
👤 *Client:* ${job.clientName}
📞 *Phone:* ${job.clientPhone}
📝 *Description:* ${job.description.substring(0, 200)}${job.description.length > 200 ? "..." : ""}
📅 *Posted:* ${new Date(job.createdAt).toLocaleString()}
      `;

      console.log("📤 Sending message to Telegram...");

      // 4. გაგზავნა
      bot.telegram
        .sendMessage(chatId, message, { parse_mode: "Markdown" })
        .then(() => {
          console.log("✅ Telegram notification sent successfully!");
        })
        .catch((err) => {
          console.error("❌ Telegram send error:", err.message);
          console.error("   Full error:", err);
        });
    } else {
      console.warn("⚠️ Telegram not configured. Skipping notification.");
    }

    // 5. API პასუხი
    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("❌ Error creating job:", error.message);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// controllers/jobController.js
// ... (ზემოთ არის სხვა ფუნქციები)

// @desc    Get all jobs with pagination, search & filter
// @route   GET /api/jobs?page=1&limit=6&search=...&category=...
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    // 1. წავიკითხოთ query პარამეტრები
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || "";
    const category = req.query.category || "";

    // 2. ავაწყოთ filter ობიექტი
    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (search) {
      filter.title = { $regex: search, $options: "i" }; // case-insensitive
    }

    // 3. გამოვთვალოთ skip
    const skip = (page - 1) * limit;

    // 4. მივიღოთ დავალებები და ჯამური რაოდენობა
    const [jobs, total] = await Promise.all([
      Job.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Job.countDocuments(filter),
    ]);

    // 5. გამოვთვალოთ გვერდების რაოდენობა
    const pages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      console.warn(`⚠️ Job with ID ${req.params.id} not found`);
      return res.status(404).json({
        success: false,
        error: "Job not found with this ID",
      });
    }
    console.log(`🔍 Found job: ${job.title}`);
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("❌ Error fetching job:", error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Invalid job ID format",
      });
    }
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update job status (open/closed)
// @route   PATCH /api/jobs/:id
// @access  Public (later we will add auth)
exports.updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (
      !status ||
      !["open", "assigned", "completed", "cancelled"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid status. Allowed: open, assigned, completed, cancelled",
      });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: "Job not found",
      });
    }

    job.status = status;
    await job.save();

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
