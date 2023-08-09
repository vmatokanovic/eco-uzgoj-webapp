import React from "react";
import "./AdsMy.css";
import axios from "axios";
import FilterMyAds from "../../components/FilterMyAds/FilterMyAds";

import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import AdCard from "../../components/AdCard/AdCard";
import { motion, AnimatePresence } from "framer-motion";

const AdsMy = () => {
  const { user } = useAuthContext();
  const [obj, setObj] = useState([]);

  const [filterCategory, setFilterCategory] = useState("Svi oglasi");

  useEffect(() => {
    const getMyAds = async () => {
      try {
        const url = `/api/ads/my?category=${filterCategory.toString()}`;
        const headers = { Authorization: `Bearer ${user.token}` };
        const { data } = await axios.get(url, { headers });
        setObj(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getMyAds();
    }
  }, [user, filterCategory]);

  // // WORKING
  // useEffect(() => {
  //   const getMyAds = async () => {
  //     try {
  //       const url = `/api/ads/my`;
  //       const headers = { Authorization: `Bearer ${user.token}` };
  //       const { data } = await axios.get(url, { headers });
  //       setObj(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   if (user) {
  //     getMyAds();
  //   }
  // }, [user]);

  return (
    <div className="my-ads-page-container">
      <div className="my-filters-container">
        <FilterMyAds
          filterCategory={filterCategory}
          categories={obj.categories ? obj.categories : []}
          setFilterCategory={(category) => setFilterCategory(category)}
        />
      </div>

      <motion.div layout="position" className="my-ads-container">
        <AnimatePresence>
          {obj.ads && obj.ads.map((ad) => <AdCard key={ad._id} ad={ad} />)}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdsMy;
