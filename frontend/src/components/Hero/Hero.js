import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero-img.png";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-box">
        <div className="hero-text-box">
          <h1 className="hero-heading">
            Vodite brigu o planeti, uzgajajte biljke na ekološki način
          </h1>
          <p className="hero-description">
            Ekološki način uzgoja raznih vrsta biljaka donijet će vam zdravije i
            bolje plodove. Informirajte se o cijelom procesu ekološkog uzgoja -
            od sjemena do ploda.
          </p>
          <Link className="get-started-btn" to="/plants">
            Get started
          </Link>
        </div>
        <div className="hero-image-box">
          <img src={heroImage} alt="group of ecological farming pictures" />
        </div>
      </div>

      <div className="plant-species">
        <div>Voće</div>
        <div>Povrće</div>
        <div>Ljekovito</div>
        <div>Aromatično</div>
        <div>Žitarice</div>
      </div>
    </div>
  );
};

export default Hero;
