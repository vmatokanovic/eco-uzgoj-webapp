import React from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import PlantCycle from "../../components/PlantCycle/PlantCycle";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <section className="hero-container">
        <div className="home-page">
          <Hero />
        </div>
      </section>

      <section className="features-container">
        <div className="home-page">
          <Features />
        </div>
      </section>

      <section className="plant-cycle-container">
        <div className="home-page">
          <PlantCycle />
        </div>
      </section>

      <section className="contact-container">
        <div className="home-page">
          <Contact />
        </div>
      </section>
      <footer className="footer-container">
        <div className="home-page">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Home;
