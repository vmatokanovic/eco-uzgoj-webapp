import React from "react";
import "./FilterMyAds.css";

const FilterMyAds = ({ categories, filterCategory, setFilterCategory }) => {
  const handleFilter = (category) => {
    const state = category;
    setFilterCategory(state);
  };

  return (
    <div className="my-ads-container-category">
      <h1 className="heading">Vaši oglasi</h1>
      <div className="my-ads-category-container">
        {categories.map((category) => (
          <div className="category" key={category}>
            <button
              className={`category-button my-ads-category-button ${
                filterCategory.includes(category) ? "active" : ""
              }`}
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterMyAds;
