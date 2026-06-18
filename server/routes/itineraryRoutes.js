const router = require("express").Router();
const auth   = require("../middleware/authMiddleware");
const ctrl   = require("../controllers/itineraryController");

router.get("/",              auth, ctrl.getMyItineraries);
router.get("/:id",           auth, ctrl.getOne);
router.delete("/:id",        auth, ctrl.deleteItinerary);
router.get("/share/:token",  ctrl.getShared); // ← public route, no auth

module.exports = router;