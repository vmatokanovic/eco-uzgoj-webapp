import React from "react";
import { Link } from "react-router-dom";
import "./PlantCard.css";

const PlantCard = (props) => {
  const { id, name, category, img } = props;
  return (
    <Link to={`/plant/${id}`}>
      <div className="product-card">
        <div className="product-card-img-container">
          <img className="product-card-img" src={img} alt="Product" />
        </div>

        <div className="product-card-info">
          <p>{name}</p>
          <div className="category-box">{category}</div>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;
