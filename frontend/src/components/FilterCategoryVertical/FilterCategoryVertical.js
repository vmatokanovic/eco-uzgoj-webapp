import React from "react";
import "./FilterCategoryVertical.css";

const FilterCategory = ({ categories, filterCategory, setFilterCategory }) => {
  const handleFilter = (category) => {
    if (filterCategory.includes(category)) {
      const state = filterCategory.filter((val) => val !== category);
      setFilterCategory(state);
    } else {
      const state = [...filterCategory, category];
      setFilterCategory(state);
    }
  };

  return (
    <div className="container-category-vertical">
      <h1 className="heading">Kategorije:</h1>
      <div className="category-container-vertical">
        {categories.map((category) => (
          <div className="category" key={category}>
            <button
              className={`vertical-category-button ${
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

export default FilterCategory;
