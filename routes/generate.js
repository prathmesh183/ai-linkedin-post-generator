const express = require("express");
const router = express.Router();
const { generatePost } = require("../controllers/generatecontroller");
const { generatePostRules, validate } = require("../middleware/validators");

// POST /api/generate
// Generate a LinkedIn post using AI
router.post("/", generatePostRules, validate, generatePost);

module.exports = router;