const { body, param, validationResult } = require("express-validator");

// Reusable validation result checker
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// Validation rules for generating a post
const generatePostRules = [
  body("topic")
    .trim()
    .notEmpty().withMessage("Topic is required")
    .isLength({ min: 5, max: 300 }).withMessage("Topic must be between 5 and 300 characters"),

  body("tone")
    .trim()
    .notEmpty().withMessage("Tone is required")
    .isIn(["professional", "casual", "motivational", "storytelling", "humorous"])
    .withMessage("Tone must be one of: professional, casual, motivational, storytelling, humorous"),

  body("keywords")
    .optional()
    .isArray({ max: 10 }).withMessage("Keywords must be an array with max 10 items")
    .custom((arr) => arr.every((k) => typeof k === "string" && k.trim().length > 0))
    .withMessage("Each keyword must be a non-empty string"),
];

// Validation rules for saving a post
const savePostRules = [
  body("topic")
    .trim()
    .notEmpty().withMessage("Topic is required")
    .isLength({ min: 5, max: 300 }).withMessage("Topic must be between 5 and 300 characters"),

  body("tone")
    .trim()
    .notEmpty().withMessage("Tone is required")
    .isIn(["professional", "casual", "motivational", "storytelling", "humorous"])
    .withMessage("Invalid tone value"),

  body("generatedPost")
    .trim()
    .notEmpty().withMessage("Generated post content is required")
    .isLength({ min: 10 }).withMessage("Post content is too short"),

  body("keywords").optional().isArray().withMessage("Keywords must be an array"),
  body("hashtags").optional().isArray().withMessage("Hashtags must be an array"),
];

// Validate MongoDB ObjectId in params
const objectIdRule = [
  param("id").isMongoId().withMessage("Invalid post ID format"),
];

module.exports = {
  validate,
  generatePostRules,
  savePostRules,
  objectIdRule,
};