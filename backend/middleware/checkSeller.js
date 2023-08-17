const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Ad = require("../models/Ad");

const checkSeller = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    const ad = await Ad.findById(req.params.id).select("seller_id");

    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }

    if (req.user._id.toString() !== ad.seller_id) {
      return res
        .status(403)
        .json({ error: "User is not the seller of this ad" });
    }

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = checkSeller;
