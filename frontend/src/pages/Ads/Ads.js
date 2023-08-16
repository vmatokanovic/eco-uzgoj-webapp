import React from "react";
import "./Ads.css";
import Search from "../../components/Search/Search";

import { useEffect, useState } from "react";

// components
import FilterCategoryVertical from "../../components/FilterCategoryVertical/FilterCategoryVertical";
import PriceFilter from "../../components/PriceFilter/PriceFilter";
import AdCard from "../../components/AdCard/AdCard";
import { motion, AnimatePresence } from "framer-motion";
import { useAdsContext } from "../../hooks/useAdsContext";

const Ads = () => {
  const { ads, dispatch } = useAdsContext();

  const [obj, setObj] = useState({});
  const [filterCategory, setFilterCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const getAllAds = async () => {
      const response = await fetch(
        `/api/ads?category=${filterCategory.toString()}&search=${search}`
      );
      const json = await response.json();
      console.log(json.ads);
      setObj(json);

      if (response.ok) {
        dispatch({ type: "SET_ADS", payload: json.ads });
      }
    };

    getAllAds();
  }, [filterCategory, search, dispatch]);

  const handlePriceFilter = async () => {
    const response = await fetch(
      `/api/ads?category=${filterCategory.toString()}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    const json = await response.json();
    console.log(json.ads);
    setObj(json);

    if (response.ok) {
      dispatch({ type: "SET_ADS", payload: json.ads });
    }
  };

  return (
    <div className="ads-page-container">
      <div className="filters-container">
        <p>
          <FilterCategoryVertical
            filterCategory={filterCategory}
            categories={obj.categories ? obj.categories : []}
            setFilterCategory={(category) => setFilterCategory(category)}
          />
        </p>
        <p>
          <PriceFilter
            handlePriceFilter={handlePriceFilter}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={(minPrice) => setMinPrice(minPrice)}
            setMaxPrice={(maxPrice) => setMaxPrice(maxPrice)}
          />
        </p>
      </div>
      <motion.div layout="position" className="ads-container">
        <Search setSearch={(search) => setSearch(search)} />
        <AnimatePresence>
          {ads && ads.map((ad) => <AdCard key={ad._id} ad={ad} />)}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Ads;
