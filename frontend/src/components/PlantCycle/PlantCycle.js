import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { phases } from "../../constants";

import "./PlantCycle.css";

const PhaseCard = ({ phase }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "#ffffff",
      color: "#2aab59",
      borderRadius: "1rem",
    }}
    contentArrowStyle={{ borderRight: "7px solid #fff" }}
    iconStyle={{ background: phase.iconBg }}
    icon={
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          style={{ width: "70%", height: "70%" }}
          src={phase.icon}
          alt={phase.company_name}
        />
      </div>
    }
  >
    <div className="phase-card">
      <h2>{phase.number}</h2>
      <h3>{phase.title}</h3>
    </div>
    <ul
      style={{
        marginTop: "2rem",
        marginLeft: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {phase.points.map((point, index) => (
        <li
          key={`phase-point-${index}`}
          style={{ color: "#555", fontSize: "14px", lineHeight: 1.3 }}
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const PlantCycle = () => {
  return (
    <>
      <motion.div>
        <div className="vertical-timeline-plant-cycle">
          <h1>Proces uzgoja eko-biljaka</h1>
          <VerticalTimeline>
            {phases.map((phase, index) => (
              <PhaseCard key={index} phase={phase} />
            ))}
          </VerticalTimeline>
        </div>
      </motion.div>
    </>
  );
};

export default PlantCycle;
