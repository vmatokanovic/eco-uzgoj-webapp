import React from "react";
import "./PriceFilter.css";

const PriceFilter = ({
  handlePriceFilter,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div className="price-filter-container">
      <p className="price-range-label" htmlFor="minPrice">
        Raspon cijene (€)
      </p>
      <div className="price-inputs-container">
        <input
          className="price-input"
          placeholder="Min"
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          className="price-input"
          placeholder="Max"
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
      <button className="set-price-btn" onClick={handlePriceFilter}>
        Postavi cijenu
      </button>
    </div>
  );
};

export default PriceFilter;
