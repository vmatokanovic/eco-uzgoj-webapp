const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Comment = require("../models/Comment");

const checkAuthorComment = async (req, res, next) => {
  // Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("username");
    const comment = await Comment.findById(req.params.id).select("username");

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (req.user.username !== comment.username) {
      return res
        .status(403)
        .json({ error: "User is not the author of this comment" });
    }

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      // Handle invalid token error
      return res.status(401).json({ error: "Invalid token" });
    }
    console.log(error); // Log other errors for debugging purposes
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = checkAuthorComment;
