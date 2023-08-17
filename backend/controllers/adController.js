const User = require("../models/User");
const Ad = require("../models/Ad");
const mongoose = require("mongoose");

const getAds = async (req, res) => {
  try {
    const search = req.query.search || "";
    let sort = req.query.sort || "name";
    let category = req.query.category || "All";
    let minPrice = req.query.minPrice || 0;
    let maxPrice = req.query.maxPrice || Infinity;

    const categoryOptions = [
      "Gnojivo",
      "Travna smjesa",
      "Zaštita i jačanje bilja",
      "Poboljšivač tla",
      "Eko sjeme",
      "Zemlja",
    ];

    category === "All"
      ? (category = [...categoryOptions])
      : (category = req.query.category.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "desc";
    }

    const ads = await Ad.find({
      name: { $regex: search, $options: "i" },
      category: { $in: category },
      price: { $gte: minPrice, $lte: maxPrice },
      sold: false,
    }).sort({ createdAt: -1 });

    const response = {
      categories: categoryOptions,
      ads,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// get user's ads
const getUserAds = async (req, res) => {
  try {
    let category = req.query.category || "All";

    const categoryOptions = ["Svi oglasi", "Aktivni oglasi", "Prodani oglasi"];

    category === "All"
      ? (category = [...categoryOptions])
      : (category = req.query.category);

    const user_id = req.user._id;

    if (category === "Svi oglasi") {
      const ads = await Ad.find({ seller_id: user_id }).sort({ createdAt: -1 });
      const response = {
        categories: categoryOptions,
        ads,
      };

      res.status(200).json(response);
    }
    if (category === "Aktivni oglasi") {
      const ads = await Ad.find({ seller_id: user_id, sold: false }).sort({
        createdAt: -1,
      });
      const response = {
        categories: categoryOptions,
        ads,
      };

      res.status(200).json(response);
    }
    if (category === "Prodani oglasi") {
      const ads = await Ad.find({ seller_id: user_id, sold: true }).sort({
        createdAt: -1,
      });
      const response = {
        categories: categoryOptions,
        ads,
      };

      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// get single ad
const getAd = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ad" });
  }
  const ad = await Ad.findById(id);
  if (!ad) {
    return res.status(404).json({ error: "No such ad in database" });
  }

  res.status(200).json(ad);
};

// create new ad
const createAd = async (req, res) => {
  const { name, img, description, category, price, contact_number } = req.body;

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
  if (!price) {
    emptyFields.push("price");
  }
  if (!contact_number) {
    emptyFields.push("contact_number");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields!", emptyFields });
  }

  // add doc to db
  try {
    const seller_id = req.user._id;
    // Fetch the user from the User model
    const user = await User.findById(seller_id);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const seller_name = user.username;

    const ad = await Ad.create({
      name,
      img,
      description,
      category,
      price,
      contact_number,
      seller_id,
      seller_name,
    });
    res.status(200).json(ad);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// delete ad
const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such ad!" });
    }

    const ad = await Ad.findOneAndDelete({ _id: id });

    if (!ad) {
      return res.status(404).json({ error: "No such ad in the database" });
    }

    res.status(200).json(ad);
  } catch (error) {
    console.error("Error deleting ad:", error);
    res.status(500).json({ error: "An error occurred while deleting the ad" });
  }
};

// update ad
const updateAd = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ad" });
  }

  const ad = await Ad.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!ad) {
    return res.status(404).json({ error: "No such ad in database" });
  }

  res.status(200).json(ad);
};

module.exports = {
  getAds,
  createAd,
  getAd,
  getUserAds,
  deleteAd,
  updateAd,
};
