const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Comment = require("../models/Comment");

const checkAuthorReply = async (req, res, next) => {
  // Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: "Authorization token required [checkAuthorReply]" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("username");

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ error: "Comment not found [checkAuthorReply]" });
    }

    const reply = comment.replies.find(
      (reply) => reply._id.toString() === req.params.replyId
    );
    if (!reply) {
      return res
        .status(404)
        .json({ error: "Reply not found [checkAuthorReply]" });
    }

    if (req.user.username !== reply.username) {
      return res
        .status(403)
        .json({
          error: "User is not the author of this reply [checkAuthorReply]",
        });
    }

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      // Handle invalid token error
      return res
        .status(401)
        .json({ error: "Invalid token [checkAuthorReply]" });
    }
    console.log(error); // Log other errors for debugging purposes
    res
      .status(401)
      .json({ error: "Request is not authorized [checkAuthorReply]" });
  }
};

module.exports = checkAuthorReply;
