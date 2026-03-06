const { body, param, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const generatePostRules = [
  body("topic").trim().notEmpty().isLength({ min: 5, max: 300 }),
  body("tone").trim().isIn(["professional","casual","motivational","storytelling","humorous"]),
  body("keywords").optional().isArray({ max: 10 }),
];

const savePostRules = [
  body("topic").trim().notEmpty(),
  body("tone").trim().isIn(["professional","casual","motivational","storytelling","humorous"]),
  body("generatedPost").trim().notEmpty(),
];

const objectIdRule = [param("id").isMongoId().withMessage("Invalid post ID")];

module.exports = { validate, generatePostRules, savePostRules, objectIdRule };
