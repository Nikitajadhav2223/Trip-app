const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title:         { type: String, default: "My Travel Itinerary" },
    extractedText: { type: String },   // raw text from PDF/image
    itinerary:     { type: Object },   // AI-generated structured data
    shareToken:    { type: String, unique: true }, // for public share link
    fileNames:     [String],           // uploaded file names
  },
  { timestamps: true }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);