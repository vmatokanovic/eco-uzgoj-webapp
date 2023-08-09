const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const checkAuthorComment = require("../middleware/checkAuthorComment");
const checkAuthorReply = require("../middleware/checkAuthorReply");

const {
  createComment,
  getAllComments,
  deleteComment,
  addReply,
  deleteReply,
  addLike,
  deleteLike,
  likeReply,
  unlikeReply,
} = require("../controllers/commentController");

// GET all comments for particular plant
router.get("/:plantId/comments", getAllComments);

// POST a new comment, user must be logged in
router.post("/:plantId/createComment", requireAuth, createComment);

// UPDATE a comment (add reply), user must be logged in
router.patch("/:commentId/reply", requireAuth, addReply);

// UPDATE a comment (delete reply), user must be logged in
router.delete(
  "/:commentId/replies/:replyId",
  requireAuth,
  checkAuthorReply,
  deleteReply
);

// DELETE a COMMENT
router.delete("/:id", requireAuth, checkAuthorComment, deleteComment);

// UPDATE a comment (add like), user must be logged in
router.patch("/:commentId/like", requireAuth, addLike);

// UPDATE a comment (delete like), user must be logged in
router.patch("/:commentId/unlike", requireAuth, deleteLike);

// UPDATE a comment and reply inside of it (add like to reply), user must be logged in
router.patch("/:commentId/replies/:replyId/like", requireAuth, likeReply);

// UPDATE a comment and reply inside of it (add like to reply), user must be logged in
router.patch("/:commentId/replies/:replyId/unlike", requireAuth, unlikeReply);

module.exports = router;
