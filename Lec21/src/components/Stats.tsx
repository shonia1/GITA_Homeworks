import React from "react";
import { usePlanetContext } from "../context/usePlanetContext";
import "./Stats.css";

const Stats: React.FC = () => {
  const { currentPlanet } = usePlanetContext();

  const stats = [
    { label: "ROTATION TIME", value: currentPlanet.rotation },
    { label: "REVOLUTION TIME", value: currentPlanet.revolution },
    { label: "RADIUS", value: currentPlanet.radius },
    { label: "AVERAGE TEMP.", value: currentPlanet.temperature },
  ];

  return (
    <div className="stats">
      {stats.map((stat) => (
        <div className="stat-item" key={stat.label}>
          <span className="stat-label">{stat.label}</span>
          <span className="stat-value">{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

export default Stats;