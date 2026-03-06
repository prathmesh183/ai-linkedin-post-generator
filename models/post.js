const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
      maxlength: [300, "Topic cannot exceed 300 characters"],
    },
    tone: {
      type: String,
      required: [true, "Tone is required"],
      enum: {
        values: ["professional", "casual", "motivational", "storytelling", "humorous"],
        message: "Tone must be one of: professional, casual, motivational, storytelling, humorous",
      },
    },
    keywords: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 10,
        message: "Maximum 10 keywords allowed",
      },
    },
    generatedPost: {
      type: String,
      required: [true, "Generated post content is required"],
    },
    hashtags: {
      type: [String],
      default: [],
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
    characterCount: {
      type: Number,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Auto-compute character count before saving
postSchema.pre("save", function (next) {
  this.characterCount = this.generatedPost.length;
  next();
});

// Index for faster queries on saved posts
postSchema.index({ isSaved: 1, createdAt: -1 });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;