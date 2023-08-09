import React from "react";
import "./Dialog.css";

const Dialog = ({ icon, title, color, hoverColor, message, onDialog }) => {
  const dialogStyle = {
    "--dialog-color": color,
    "--dialog-hover-color": hoverColor,
  };

  return (
    <div className="dialog-container" style={dialogStyle}>
      <div className="dialog-box">
        <div className="title-container">
          <p className="title">
            <span className="form-item-icon material-symbols-rounded">
              {icon}
            </span>
            {title}
          </p>
          <button className="close-button" onClick={() => onDialog(false)}>
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        <p className="message">{message}</p>
        <div className="dialog-buttons-container">
          <button className="button-cancel" onClick={() => onDialog(false)}>
            CANCEL
          </button>
          <button className="button-confirm" onClick={() => onDialog(true)}>
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
