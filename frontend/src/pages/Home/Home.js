import React from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
    <div>
      <section className="hero-container">
        <div className="home-page">
          <Hero />
        </div>
      </section>
      <section className="benefits-container"></section>
    </div>
  );
};

export default Home;
