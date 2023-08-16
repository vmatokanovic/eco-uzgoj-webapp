import React from "react";
import "./Footer.css";

import ferit_logo from "../../assets/ferit_slider_logo.png";
import ekouzgoj_logo from "../../assets/logo.png";
import linkedin_logo from "../../assets/svgs/linkedin-round-svgrepo-com.svg";
import github_logo from "../../assets/svgs/github-142-svgrepo-com.svg";

const Footer = () => {
  return (
    <div>
      <div className="logos-and-socials-container">
        <div className="logos-container">
          <a href="https://www.ferit.unios.hr/">
            <img src={ferit_logo} alt="" />
          </a>
          <a href="/">
            <img src={ekouzgoj_logo} alt="" />
          </a>
        </div>
        <div className="socials-container">
          <a href="https://www.linkedin.com/in/valentin-matokanovi%C4%87-686a5325a/">
            <img src={linkedin_logo} alt="" />
          </a>
          <a href="https://github.com/vmatokanovic/">
            <img src={github_logo} alt="" />
          </a>
        </div>
      </div>
      <div className="copyright-container">
        &copy;2023 Valentin Matokanović. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
