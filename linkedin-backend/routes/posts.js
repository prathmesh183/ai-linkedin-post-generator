const express = require("express");
const router = express.Router();
const { savePost, getSavedPosts, getPostById, deletePost, clearAllPosts } = require("../controllers/postsController");
const { savePostRules, objectIdRule, validate } = require("../middleware/validators");

router.post("/", savePostRules, validate, savePost);
router.get("/", getSavedPosts);
router.get("/:id", objectIdRule, validate, getPostById);
router.delete("/:id", objectIdRule, validate, deletePost);
router.delete("/", clearAllPosts);
module.exports = router;
