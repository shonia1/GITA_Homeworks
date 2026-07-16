import React from "react";
import { usePlanetContext } from "../context/usePlanetContext";
import PlanetImage from "./PlanetImage";
import Tabs from "./Tabs";
import Stats from "./Stats";
import "./PlanetDetail.css";

const PlanetDetail: React.FC = () => {
  const { currentPlanet, activeTab } = usePlanetContext();

  const getContent = () => {
    switch (activeTab) {
      case "overview":
        return currentPlanet.overview;
      case "structure":
        return currentPlanet.structure;
      case "geology":
        return currentPlanet.geology;
    }
  };

  const content = getContent();

  return (
    <div className="planet-detail">
      <div className="planet-detail-top">
        <div className="planet-image-wrapper">
          <PlanetImage />
        </div>
        <div className="planet-info-wrapper">
          <h1 className="planet-name">{currentPlanet.name}</h1>
          <p className="planet-description">{content.content}</p>
          <p className="planet-source">
            Source:{" "}
            <a href={content.source} target="_blank" rel="noopener noreferrer">
              Wikipedia
            </a>
          </p>
          <Tabs />
        </div>
      </div>
      <Stats />
    </div>
  );
};

export default PlanetDetail;
