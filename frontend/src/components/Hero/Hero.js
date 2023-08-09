import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import seed from "../../assets/seed.png";
import seedPlanting from "../../assets/seed-planting.png";
import plant from "../../assets/plant.png";
import vegetables from "../../assets/vegetables-salad.png";
import "./Hero.css";

const images = [seed, seedPlanting, plant, vegetables];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="hero">
      <div className="hero-text-box">
        <h1 className="hero-heading">
          Vodite brigu o planeti, uzgajajte biljke na ekološki način
        </h1>
        <p className="hero-description">
          Ekološki način uzgoja raznih vrsta biljaka donijet će vam zdravije i
          bolje plodove. Informirajte se o cijelom procesu ekološkog uzgoja - od
          sjemena do ploda.
        </p>
        <Link className="get-started-btn" to="/plants">
          Get started
        </Link>
      </div>
      <div className="hero-image-box">
        <AnimatePresence mode="wait">
          <motion.div
            className="planting-animation-container"
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={images[currentImageIndex]} alt="Planting cycle" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;
