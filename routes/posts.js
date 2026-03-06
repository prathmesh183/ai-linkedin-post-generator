const express = require("express");
const router = express.Router();
const {
  savePost,
  getSavedPosts,
  getPostById,
  deletePost,
  clearAllPosts,
} = require("../controllers/postscontroller");
const { savePostRules, objectIdRule, validate } = require("../middleware/validators");

// POST   /api/posts         — Save a generated post
router.post("/", savePostRules, validate, savePost);

// GET    /api/posts         — Get all saved posts (with pagination & tone filter)
router.get("/", getSavedPosts);

// GET    /api/posts/:id     — Get a single saved post
router.get("/:id", objectIdRule, validate, getPostById);

// DELETE /api/posts/:id     — Delete a single saved post
router.delete("/:id", objectIdRule, validate, deletePost);

// DELETE /api/posts         — Clear all saved posts
router.delete("/", clearAllPosts);

module.exports = router;