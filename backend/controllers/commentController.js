const Comment = require("../models/Comment");
const mongoose = require("mongoose");

// GET all comments for particular plant post
const getAllComments = async (req, res) => {
  try {
    const id = req.params?.plantId;

    if (id) {
      const comments = await Comment.find({ plantId: id }).sort({
        createdAt: "desc",
      });
      res.status(200).json(comments);
    } else {
      res
        .status(404)
        .json({ message: "Comments with this plant ID is not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Problem with getting plant's post from server",
    });
  }
};

// UPDATE comment to add like to it
const addLike = async (req, res) => {
  try {
    const comment_id = req.params?.commentId;

    if (comment_id) {
      const user_name = req.body?.username;

      const comment = await Comment.findById(comment_id);

      if (comment.likes.includes(user_name)) {
        return res
          .status(400)
          .json({ message: "User has already liked this comment!" });
      } else {
        const newLike = await Comment.findByIdAndUpdate(
          { _id: comment_id },
          { $push: { likes: user_name } },
          { new: true }
        );

        res.status(200).json(newLike);
      }
    } else {
      res.status(404).json({ message: "Comments with this ID is not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Problem with getting plant's post from server",
    });
  }
};

// UPDATE comment to add like to it
const deleteLike = async (req, res) => {
  try {
    const comment_id = req.params?.commentId;

    if (comment_id) {
      const user_name = req.body?.username;

      const comment = await Comment.findById(comment_id);

      if (comment.likes.includes(user_name)) {
        const newLike = await Comment.findByIdAndUpdate(
          { _id: comment_id },
          { $pull: { likes: user_name } },
          { new: true }
        );

        res.status(200).json(newLike);
      } else {
        return res
          .status(400)
          .json({ message: "User didn't like this comment!" });
      }
    } else {
      res.status(404).json({ message: "Comments with this ID is not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Problem with getting plant's post from server",
    });
  }
};

// UPDATE comment to add reply to it
const addReply = async (req, res) => {
  try {
    const comment_id = req.params?.commentId;

    if (comment_id) {
      //reply object
      const reply = {
        commentId: comment_id,
        username: req.body.username,
        reply: req.body.reply,
        createdAt: new Date(),
      };
      const newComment = await Comment.findByIdAndUpdate(
        { _id: comment_id },
        { $push: { replies: reply } },
        { new: true }
      );

      res.status(200).json(newComment);
    } else {
      res.status(404).json({ message: "Comments with this ID is not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Problem with getting plant's post from server",
    });
  }
};

// UPDATE comment to delete reply from it
const deleteReply = async (req, res) => {
  try {
    const comment_id = req.params?.commentId;
    const reply_id = req.params?.replyId;

    if (comment_id && reply_id) {
      const newComment = await Comment.findByIdAndUpdate(
        { _id: comment_id },
        { $pull: { replies: { _id: reply_id } } },
        { new: true }
      );

      res.status(200).json(newComment);
    } else {
      res.status(404).json({ message: "Comments with this ID is not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Problem with getting plant's comment from server",
    });
  }
};

// UPDATE comment to add like to some reply
const likeReply = async (req, res) => {
  try {
    const comment_id = req.params?.commentId;
    const reply_id = req.params?.replyId;
    const user_name = req.body?.username;

    if (comment_id && reply_id) {
      const comment = await Comment.findById(comment_id);

      const replyIndex = comment.replies.findIndex(
        (reply) => reply._id.toString() === reply_id
      );

      // Check if the username is already in the likes array of the specific reply
      if (comment.replies[replyIndex].likes.includes(user_name)) {
        return res
          .status(400)
          .json({ message: "User has already liked this reply!" });
      }
      comment.replies[replyIndex].likes.push(user_name);

      const newComment = await comment.save();

      res.status(200).json(newComment);
    } else {
      res.status(404).json({ message: "Comments with this ID is not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Problem with getting plant's comment from server",
    });
  }
};

// UPDATE comment to add like to some reply
const unlikeReply = async (req, res) => {
  try {
    const comment_id = req.params?.commentId;
    const reply_id = req.params?.replyId;
    const user_name = req.body?.username;

    if (comment_id && reply_id) {
      const comment = await Comment.findById(comment_id);

      const replyIndex = comment.replies.findIndex(
        (reply) => reply._id.toString() === reply_id
      );

      const replyLikes = comment.replies[replyIndex].likes;

      const likeIndex = replyLikes.indexOf(user_name);
      replyLikes.splice(likeIndex, 1);

      // Check if the username is already in the likes array of the specific reply
      if (likeIndex === -1) {
        return res
          .status(400)
          .json({ message: "User has not liked this reply!" });
      }

      const newComment = await comment.save();

      res.status(200).json(newComment);
    } else {
      res.status(404).json({ message: "Comments with this ID is not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Problem with getting plant's comment from server",
    });
  }
};

// CREATE new comment
const createComment = async (req, res) => {
  const id = req.params?.plantId;
  const { comment, username } = req?.body;

  // add doc to db
  try {
    if (id) {
      const createdComment = await Comment.create({
        plantId: id,
        comment,
        username,
      });
      res.status(200).json(createdComment);
    } else {
      res
        .status(404)
        .json({ message: "Comment with this plant ID is not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//DELETE comment
// delete ad
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such comment!" });
    }

    const comment = await Comment.findOneAndDelete({ _id: id });

    if (!comment) {
      return res.status(404).json({ error: "No such comment in the database" });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the comment" });
  }
};

module.exports = {
  createComment,
  getAllComments,
  deleteComment,
  addReply,
  deleteReply,
  addLike,
  deleteLike,
  likeReply,
  unlikeReply,
};
