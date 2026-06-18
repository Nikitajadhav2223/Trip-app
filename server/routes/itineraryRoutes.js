const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/itineraryController");

// ✅ Public route FIRST (important)
router.get("/share/:token", ctrl.getShared);

// 🔒 Protected routes
router.get("/", auth, ctrl.getMyItineraries);
router.get("/:id", auth, ctrl.getOne);
router.delete("/:id", auth, ctrl.deleteItinerary);

module.exports = router;