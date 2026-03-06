const express = require("express");
const router = express.Router();
const { generatePost } = require("../controllers/generateController");
const { generatePostRules, validate } = require("../middleware/validators");

router.post("/", generatePostRules, validate, generatePost);
module.exports = router;
