import React from "react";
import "./AdsMy.css";
import axios from "axios";
import FilterMyAds from "../../components/FilterMyAds/FilterMyAds";

import Lottie from "react-lottie";
import lottieData from "../../assets/not_found.json";

import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAdsContext } from "../../hooks/useAdsContext";

// components
import AdCard from "../../components/AdCard/AdCard";
import { motion, AnimatePresence } from "framer-motion";

const AdsMy = () => {
  const { user } = useAuthContext();
  const { ads, dispatch } = useAdsContext();

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
        dispatch({ type: "SET_ADS", payload: data.ads });
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getMyAds();
    }
  }, [user, filterCategory, dispatch]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
          {ads && ads.map((ad) => <AdCard key={ad._id} ad={ad} />)}
          {ads?.length < 1 && (
            <div className="ads-not-found-container">
              <div className="ads-not-found-animation">
                <Lottie
                  options={defaultOptions}
                  height="100%"
                  width="100%"
                  isStopped={false}
                  isPaused={false}
                />
              </div>

              <p className="ads-not-found-text">
                Nije pronađen niti jedan oglas...
              </p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdsMy;
