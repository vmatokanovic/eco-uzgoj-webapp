import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./PlantCard.css";

import { useAuthContext } from "../../hooks/useAuthContext";

import Dialog from "../Dialog/Dialog";

const PlantCard = (props) => {
  const { user } = useAuthContext();

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const IdPlantRef = useRef();

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    handleDialog("Are you sure you want to delete this plant?", true);

    IdPlantRef.current = id;
  };

  const areUSureDelete = async (choose) => {
    if (choose) {
      if (!user) {
        return;
      }
      const response = await fetch("/api/plants/" + id, {
        method: "DELETE",
        // prettier-ignore
        headers: {
            'Authorization': `Bearer ${user.token}`,
          },
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        window.location.reload(false);
      }
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const { id, name, category, img } = props;

  return (
    <div>
      <Link to={`/plant/${id}`}>
        <div className="product-card">
          <div className="product-card-img-container">
            <img className="product-card-img" src={img} alt="Product" />
          </div>

          <div className="product-card-info">
            <p>{name}</p>
            <div className="category-box">{category}</div>
          </div>
          {user && user.role === "admin" && (
            <div
              className="plant-delete-btn"
              onClick={(e) => handleDelete(e, id)}
            >
              <span className="material-symbols-rounded">close</span>
            </div>
          )}
        </div>
      </Link>
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

export default PlantCard;
