import React from "react";

const DropdownItem = (props) => {
  const { icon, text } = props;

  return (
    <li className="dropdown-item">
      <span className="material-symbols-outlined">{icon}</span>
      {text}
    </li>
  );
};

export default DropdownItem;
