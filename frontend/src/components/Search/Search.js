import React from "react";
import "./Search.css";

const Search = ({ setSearch }) => {
  return (
    <div className="search-container">
      <div className="search-input-container">
        <div className="search-icon-container">
          <span className="material-symbols-outlined">search</span>
        </div>

        <input
          input
          type="text"
          className="search-input"
          placeholder="Search..."
          onChange={({ currentTarget: input }) => setSearch(input.value)}
        />
      </div>
    </div>
  );
};

export default Search;
