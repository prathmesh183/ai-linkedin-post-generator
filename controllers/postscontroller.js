const Post = require("../models/post");

/**
 * POST /api/posts
 * Save a generated post to MongoDB
 */
const savePost = async (req, res, next) => {
  try {
    const { topic, tone, keywords, generatedPost, hashtags } = req.body;

    const post = await Post.create({
      topic,
      tone,
      keywords: keywords || [],
      generatedPost,
      hashtags: hashtags || [],
      isSaved: true,
    });

    res.status(201).json({
      success: true,
      message: "Post saved successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/posts
 * Get all saved posts (history), sorted by newest first
 */
const getSavedPosts = async (req, res, next) => {
  try {
    // Pagination support
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Optional tone filter
    const filter = { isSaved: true };
    if (req.query.tone) {
      const validTones = ["professional", "casual", "motivational", "storytelling", "humorous"];
      if (validTones.includes(req.query.tone)) {
        filter.tone = req.query.tone;
      }
    }

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v"),
      Post.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
        hasMore: skip + posts.length < total,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/posts/:id
 * Get a single saved post by ID
 */
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).select("-__v");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/posts/:id
 * Delete a saved post by ID
 */
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/posts
 * Clear all saved posts (bulk delete)
 */
const clearAllPosts = async (req, res, next) => {
  try {
    const result = await Post.deleteMany({ isSaved: true });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} posts deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  savePost,
  getSavedPosts,
  getPostById,
  deletePost,
  clearAllPosts,
};