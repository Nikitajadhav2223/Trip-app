const Itinerary = require("../models/Itinerary");

// GET all itineraries for logged-in user
exports.getMyItineraries = async (req, res) => {
  try {
    const items = await Itinerary.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select("-extractedText"); // don't send raw text to frontend
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single itinerary (owner only)
exports.getOne = async (req, res) => {
  try {
    const item = await Itinerary.findOne({
      _id:    req.params.id,
      userId: req.user._id,
    });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET shared itinerary — PUBLIC, no auth needed
exports.getShared = async (req, res) => {
  try {
    const item = await Itinerary.findOne({ shareToken: req.params.token })
      .select("-extractedText -userId");
    if (!item) return res.status(404).json({ message: "Share link is invalid or expired" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE itinerary
exports.deleteItinerary = async (req, res) => {
  try {
    await Itinerary.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};