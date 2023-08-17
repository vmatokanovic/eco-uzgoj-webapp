const express = require("express");
const {
  createAd,
  getAds,
  getAd,
  getUserAds,
  deleteAd,
  updateAd,
} = require("../controllers/adController");

const requireAuth = require("../middleware/requireAuth");
const checkSeller = require("../middleware/checkSeller");

const router = express.Router();

// GET all ads
router.get("/", getAds);

// GET user's ads
router.get("/my", requireAuth, getUserAds);

// GET a single ad
router.get("/:id", getAd);

// POST a new ad
router.post("/", requireAuth, createAd);

// DELETE an ad
router.delete("/:id", checkSeller, deleteAd);

// UPDATE an ad
router.patch("/:id", updateAd);

module.exports = router;
