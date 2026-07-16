import React from "react";
import { usePlanetContext } from "../context/usePlanetContext";
import "./PlanetImage.css";

const PlanetImage: React.FC = () => {
  const { currentPlanet, activeTab } = usePlanetContext();

  const getImageSrc = () => {
    if (activeTab === "structure") return currentPlanet.images.internal;
    return currentPlanet.images.planet;
  };

  const showGeology = activeTab === "geology";

  return (
    <div className="planet-image-container">
      <img
        src={getImageSrc()}
        alt={currentPlanet.name}
        className="planet-image"
      />
      {showGeology && (
        <img
          src={currentPlanet.images.geology}
          alt="geology"
          className="geology-overlay"
        />
      )}
    </div>
  );
};

export default PlanetImage;
