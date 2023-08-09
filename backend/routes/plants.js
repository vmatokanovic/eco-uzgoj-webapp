const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant");
const {
  getPlants,
  createPlant,
  getPlant,
} = require("../controllers/plantController");
const requireAdmin = require("../middleware/requireAdmin");

// GET all plants, access to everyone
router.get("/", getPlants);

// POST a new plant, user must have attribute role === "admin" to access
router.post("/", requireAdmin, createPlant);

// GET a single plant, access to everyone
router.get("/:id", getPlant);

module.exports = router;
