import React from "react";
import "./FilterCategory.css";

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
    <div className="container-category">
      <h1 className="heading">Vrste biljaka</h1>
      <div className="category-container">
        {categories.map((category) => (
          <div className="category" key={category}>
            <button
              className={`category-button ${
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
