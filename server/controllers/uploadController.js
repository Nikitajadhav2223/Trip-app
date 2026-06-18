const crypto    = require("crypto");
const { extractTextFromFile } = require("../services/extractService");
const { generateItinerary }   = require("../services/aiService");
const Itinerary = require("../models/Itinerary");

exports.uploadAndGenerate = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "Please upload at least one file" });

    // 1. Extract text from all files
    let combinedText = "";
    const fileNames  = [];

    for (const file of req.files) {
      console.log(`📄 Extracting from: ${file.originalname}`);
      const text = await extractTextFromFile(file);
      combinedText += `\n=== ${file.originalname} ===\n${text}\n`;
      fileNames.push(file.originalname);
    }

    if (!combinedText.trim())
      return res.status(400).json({ message: "Could not extract text from files" });

    // 2. Generate itinerary with AI
    console.log("🤖 Generating itinerary with Gemini...");
    const itineraryData = await generateItinerary(combinedText);

    // 3. Save to MongoDB
    const shareToken = crypto.randomBytes(20).toString("hex");
    const saved = await Itinerary.create({
      userId:        req.user._id,
      title:         itineraryData.title || "My Travel Itinerary",
      extractedText: combinedText,
      itinerary:     itineraryData,
      shareToken,
      fileNames,
    });

    res.status(201).json({
      message:   "Itinerary generated successfully!",
      itinerary: saved,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
};