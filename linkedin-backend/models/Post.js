const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true, trim: true, maxlength: 300 },
    tone: {
      type: String,
      required: true,
      enum: ["professional", "casual", "motivational", "storytelling", "humorous"],
    },
    keywords: { type: [String], default: [] },
    generatedPost: { type: String, required: true },
    hashtags: { type: [String], default: [] },
    isSaved: { type: Boolean, default: false },
    characterCount: { type: Number },
  },
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  this.characterCount = this.generatedPost.length;
  next();
});

module.exports = mongoose.model("Post", postSchema);
