import React, { useEffect, useState } from "react";
import PlantCard from "../../components/PlantCard/PlantCard";
import "./Plants.css";
import Search from "../../components/Search/Search";
import FilterCategory from "../../components/FilterCategory/FilterCategory";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Plants = () => {
  const [obj, setObj] = useState({});
  const [filterCategory, setFilterCategory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllPlants = async () => {
      try {
        const url = `/api/plants?category=${filterCategory.toString()}&search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPlants();
  }, [filterCategory, search]);

  return (
    <div className="plants-page-container">
      <div className="plants-page-search-container">
        <Search setSearch={(search) => setSearch(search)} />
      </div>

      <FilterCategory
        filterCategory={filterCategory}
        categories={obj.categories ? obj.categories : []}
        setFilterCategory={(category) => setFilterCategory(category)}
      />
      <motion.div layout className="plants-css-grid">
        <AnimatePresence>
          {obj.plants
            ? obj.plants.map((plant) => (
                <motion.div
                  layout
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  key={plant._id}
                >
                  <PlantCard
                    name={plant.name}
                    img={"http://localhost:3000/uploads/" + plant.img[0]}
                    id={plant._id}
                    category={plant.category}
                  />
                </motion.div>
              ))
            : ""}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Plants;
