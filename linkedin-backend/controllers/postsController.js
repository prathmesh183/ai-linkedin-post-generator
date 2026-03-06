const Post = require("../models/Post");

const savePost = async (req, res, next) => {
  try {
    const post = await Post.create({ ...req.body, isSaved: true });
    res.status(201).json({ success: true, message: "Post saved", data: post });
  } catch (error) { next(error); }
};

const getSavedPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = { isSaved: true };
    if (req.query.tone) filter.tone = req.query.tone;

    const [posts, total] = await Promise.all([
      Post.find(filter).sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit),
      Post.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true, data: posts,
      pagination: { currentPage: page, totalPages: Math.ceil(total/limit), totalPosts: total },
    });
  } catch (error) { next(error); }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, data: post });
  } catch (error) { next(error); }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) { next(error); }
};

const clearAllPosts = async (req, res, next) => {
  try {
    const result = await Post.deleteMany({ isSaved: true });
    res.status(200).json({ success: true, message: `${result.deletedCount} posts deleted` });
  } catch (error) { next(error); }
};

module.exports = { savePost, getSavedPosts, getPostById, deletePost, clearAllPosts };
