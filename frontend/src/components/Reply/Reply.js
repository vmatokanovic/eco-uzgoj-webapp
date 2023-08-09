import React, { useState, useRef } from "react";
import "./Reply.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCommentsContext } from "../../hooks/useCommentsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Dialog from "../Dialog/Dialog";

const Reply = ({ commentId, reply }) => {
  const { user } = useAuthContext();
  const { comments, dispatch } = useCommentsContext();

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
    handleDialog("Are you sure you want to delete this reply?", true);

    IdAdRef.current = id;
  };

  const areUSureDelete = async (choose) => {
    if (choose) {
      if (!user) {
        return;
      }
      const response = await fetch(
        `/api/comments/${commentId}/replies/${reply._id}`,
        {
          method: "DELETE",
          // prettier-ignore
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        console.log("Reply deleted!" + json);
        dispatch({ type: "UPDATE_COMMENT", payload: json });
      }
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const newLike = {
      username: user.username,
    };

    const response = await fetch(
      `/api/comments/${commentId}/replies/${reply?._id}/like`,
      {
        method: "PATCH",
        body: JSON.stringify(newLike),
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          'Authorization': `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      console.log("New like is added to reply!", json);

      dispatch({
        type: "UPDATE_COMMENT",
        payload: json,
      });
    }
  };

  const handleUnlike = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const newLike = {
      username: user.username,
    };

    const response = await fetch(
      `/api/comments/${commentId}/replies/${reply?._id}/unlike`,
      {
        method: "PATCH",
        body: JSON.stringify(newLike),
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          'Authorization': `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      console.log("Like is deleted from reply!", json);

      dispatch({
        type: "UPDATE_COMMENT",
        payload: json,
      });
    }
  };

  return (
    <div className="reply-container">
      <div className="comment-container reply">
        <div className="comment-rating">
          <p>{reply?.likes.length}</p>
          {reply?.likes.includes(user?.username) ? (
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
              <p>{reply?.username}</p>
              <time>
                {formatDistanceToNow(new Date(reply?.createdAt), {
                  addSuffix: true,
                })}
              </time>
            </div>

            {user && user.username === reply.username ? (
              <div
                className="delete-btn"
                onClick={(e) => handleDelete(e, reply._id)}
              >
                <span class="material-symbols-outlined">delete</span>Delete
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="comment-message">
            <p>{reply?.reply}</p>
          </div>
        </div>
      </div>
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

export default Reply;
