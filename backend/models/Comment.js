const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    plantId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
    },
    replies: [
      {
        username: {
          type: String,
          required: true,
        },
        commentId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        reply: {
          type: String,
          required: true,
        },
        likes: {
          type: [String],
        },
        createdAt: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);

// WORKING, but model without likes

// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const commentSchema = new Schema(
//   {
//     plantId: {
//       type: Schema.Types.ObjectId,
//       ref: "Plant",
//       required: true,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     comment: {
//       type: String,
//       required: true,
//     },
//     replies: [
//       {
//         username: {
//           type: String,
//           required: true,
//         },
//         commentId: {
//           type: Schema.Types.ObjectId,
//           required: true,
//         },
//         reply: {
//           type: String,
//           required: true,
//         },
//         createdAt: {
//           type: Date,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Comment", commentSchema);
