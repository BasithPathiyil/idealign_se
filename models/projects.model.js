const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    place: {
      type: String,
    },
    area: {
      type: String,
    },
    client: {
      type: String,
    },
    mainImage: {
      type: String,
      required: true,
    },
    otherImages: [],
    shortDesc: {
      type: String,
    },
    description: {
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
const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
