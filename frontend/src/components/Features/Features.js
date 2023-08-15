import React from "react";
import "./Features.css";
import FeatureCard from "../FeatureCard/FeatureCard";

const Features = () => {
  return (
    <div className="features">
      <h1>Značajke</h1>
      <p>
        Nudimo Vam razne značajke koje pomažu pri ekološkom uzgoju biljaka.
        Možete se informirati o skakakvim vrstama biljaka, pretraživati
        proizvode vezane uz ekološki uzgoj itd.
      </p>
      <div className="features-css-grid">
        <FeatureCard
          icon="group"
          title="Registracija i prijava korisnika"
          description="Svaki korisnik može registrirati i prijaviti se u svoj profil. Prijavom
        u profil omogućuju se sve korisničke značajke web-aplikacije."
        />
        <FeatureCard
          icon="
          psychiatry"
          title="Pregled biljaka"
          description="Pregledajte razne vrste biljaka i informirajte se o njima te o 
          njihovom načinu ekološkog uzgoja (plodored, vrijeme sadnje/berbe, gnojiva...).
           Svaki korisnik može registrirati i prijaviti se u svoj profil."
        />
        <FeatureCard
          icon="
          forum"
          title="Razgovori"
          description="Ukoliko imate kakvih pitanja ili želite pomoći drugima te dati 
          neke savjete u vezi određene biljke, možete to učiniti unutar pregleda svake 
          biljke."
        />
        <FeatureCard
          icon="
          ad_group"
          title="Oglasi"
          description="Kupujte od drugih ili prodajte svoje proizvode vezane uz ekološki
           uzgoj biljaka. To mogu biti organska gnojiva, eko-sjemena, sredstva za 
           zaštitu i jačanje biljaka, travne smjese itd."
        />
      </div>
    </div>
  );
};

export default Features;
