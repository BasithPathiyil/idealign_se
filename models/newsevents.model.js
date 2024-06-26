const mongoose = require("mongoose");

const newseventsSchema = new mongoose.Schema(
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
    eventDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "deactivated"],
      default: "active",
    },
  },
  { timestamps: true }
);
const Newsevents = mongoose.model("Newsevents", newseventsSchema);

module.exports = Newsevents;
