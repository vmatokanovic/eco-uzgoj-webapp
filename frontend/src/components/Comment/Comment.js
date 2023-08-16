import React, { useState, useRef } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCommentsContext } from "../../hooks/useCommentsContext";
import "./Comment.css";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Reply from "../Reply/Reply";
import Dialog from "../Dialog/Dialog";
import CommentForm from "../CommentForm/CommentForm";

const Comment = ({ comment }) => {
  const { user } = useAuthContext();
  const { dispatch } = useCommentsContext();

  const [replyButtonBox, setReplyButtonBox] = useState(false);
  const [error, setError] = useState(null);
  const [reply, setReply] = useState("");

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const IdAdRef = useRef();

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    handleDialog("Are you sure you want to delete this comment?", true);

    IdAdRef.current = id;
  };

  const areUSureDelete = async (choose) => {
    if (choose) {
      if (!user) {
        return;
      }
      const response = await fetch("/api/comments/" + comment._id, {
        method: "DELETE",
        // prettier-ignore
        headers: {
            'Authorization': `Bearer ${user.token}`,
          },
      });
      const json = await response.json();
      if (response.ok) {
        console.log("Comment deleted!");
        dispatch({ type: "DELETE_COMMENT", payload: json });
      }
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const replyButtonClicked = () => {
    setReplyButtonBox((prev) => !prev);
  };

  const replySubmitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const newReply = {
      commentId: comment?._id,
      username: user.username,
      reply: reply,
    };

    const response = await fetch(`/api/comments/${comment._id}/reply`, {
      method: "PATCH",
      body: JSON.stringify(newReply),
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setReply("");
      setError(null);
      console.log("New reply is added to comment!", json);
      replyButtonClicked();

      dispatch({
        type: "UPDATE_COMMENT",
        payload: json,
      });
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const newLike = {
      commentId: comment?._id,
      username: user.username,
    };

    const response = await fetch(`/api/comments/${comment._id}/like`, {
      method: "PATCH",
      body: JSON.stringify(newLike),
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      console.log("New like is added to comment!", json);

      dispatch({
        type: "UPDATE_COMMENT",
        payload: json,
      });
    }
  };

  const handleUnlike = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const newLike = {
      commentId: comment?._id,
      username: user.username,
    };

    const response = await fetch(`/api/comments/${comment._id}/unlike`, {
      method: "PATCH",
      body: JSON.stringify(newLike),
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      console.log("Like is deleted from comment!", json);

      dispatch({
        type: "UPDATE_COMMENT",
        payload: json,
      });
    }
  };

  return (
    <div>
      <div className="comment-container">
        <div className="comment-rating">
          <p>{comment?.likes.length}</p>
          {comment?.likes.includes(user?.username) ? (
            <span
              onClick={handleUnlike}
              class="material-symbols-outlined like-btn filled-icon"
            >
              thumb_up
            </span>
          ) : (
            <span
              onClick={handleLike}
              class="material-symbols-outlined like-btn"
            >
              thumb_up
            </span>
          )}
        </div>
        <div className="comment-data-container">
          <div className="comment-details">
            <div className="username-and-time">
              <p>{comment?.username}</p>
              <time>
                {formatDistanceToNow(new Date(comment?.createdAt), {
                  addSuffix: true,
                })}
              </time>
            </div>
            <div className="comment-buttons-container">
              {user && (
                <div className="reply-btn" onClick={replyButtonClicked}>
                  <span class="material-symbols-outlined">reply</span>Reply
                </div>
              )}

              {user && user.username === comment.username ? (
                <div
                  className="delete-btn"
                  onClick={(e) => handleDelete(e, comment._id)}
                >
                  <span class="material-symbols-outlined">delete</span>Delete
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="comment-message">
            <p>{comment?.comment}</p>
          </div>
        </div>
      </div>

      {comment?.replies?.length >= 0 && (
        <div className="replies-container">
          <div className="replies-line"></div>
          <div className="reply-container">
            {comment?.replies?.length >= 0 &&
              comment?.replies?.map((reply) => (
                <Reply
                  key={reply?._id}
                  commentId={comment?._id}
                  reply={reply}
                />
              ))}

            {replyButtonBox && (
              <div className="reply-box-container">
                <CommentForm
                  cancelBtnClicked={replyButtonClicked}
                  cancelBtn={true}
                  title="Post reply"
                  placeholder="Write a reply..."
                  submitHandler={replySubmitHandler}
                  setComment={setReply}
                  error={error}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {dialog.isLoading && (
        <Dialog
          onDialog={areUSureDelete}
          message={dialog.message}
          title="Delete"
          icon="delete"
          color="#ff6767"
          hoverColor="#cc5252"
        />
      )}
    </div>
  );
};

export default Comment;
