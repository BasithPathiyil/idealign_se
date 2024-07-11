const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
    },
    content: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "deactivated"],
      default: "active",
    },
  },
  { timestamps: true }
);
const Blogs = mongoose.model("Blogs", blogsSchema);

module.exports = Blogs;
