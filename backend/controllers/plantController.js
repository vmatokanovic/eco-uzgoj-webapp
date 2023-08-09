const Plant = require("../models/Plant");
const mongoose = require("mongoose");

// GET all plants
const getPlants = async (req, res) => {
  try {
    const search = req.query.search || "";
    let sort = req.query.sort || "name";
    let category = req.query.category || "All";

    const categoryOptions = [
      "Voce",
      "Povrce",
      "Ljekovito",
      "Aromaticno",
      "Zitarice",
    ];

    category === "All"
      ? (category = [...categoryOptions])
      : (category = req.query.category.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const plants = await Plant.find({ name: { $regex: search, $options: "i" } })
      .where("category")
      .in([...category])
      .sort(sortBy);

    const response = {
      categories: categoryOptions,
      plants,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// CREATE new ad
const createPlant = async (req, res) => {
  const { name, img, description, category, farming_method } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!img || img.length === 0) {
    emptyFields.push("img");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!farming_method) {
    emptyFields.push("farming_method");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields!", emptyFields });
  }

  // add doc to db
  try {
    const plant = await Plant.create({
      name,
      img,
      description,
      category,
      farming_method,
    });
    res.status(200).json(plant);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// GET single plant
const getPlant = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such plant" });
  }
  const plant = await Plant.findById(id);
  if (!plant) {
    return res.status(404).json({ error: "No such plant in database" });
  }

  res.status(200).json(plant);
};

module.exports = {
  getPlants,
  createPlant,
  getPlant,
};
