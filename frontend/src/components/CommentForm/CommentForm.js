import React from "react";
import "./CommentForm.css";

const CommentForm = ({
  cancelBtnClicked,
  cancelBtn,
  submitHandler,
  setComment,
  title,
  placeholder,
  value,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div className="post-comment-container">
        <textarea
          className="comment-textarea"
          value={value}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
          required
        />
        <div className="comment-buttons-container">
          <button className="post-comment-btn" type="submit">
            {title}
          </button>
          {cancelBtn && (
            <div className="cancel-btn" onClick={cancelBtnClicked}>
              Cancel
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
