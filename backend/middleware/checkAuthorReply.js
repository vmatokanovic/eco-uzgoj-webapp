const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Comment = require("../models/Comment");

const checkAuthorReply = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("username");

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const reply = comment.replies.find(
      (reply) => reply._id.toString() === req.params.replyId
    );
    if (!reply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    if (req.user.username !== reply.username) {
      return res.status(403).json({
        error: "User is not the author of this reply",
      });
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

module.exports = checkAuthorReply;
