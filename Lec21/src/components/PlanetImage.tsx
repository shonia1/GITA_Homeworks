import React from "react";
import { usePlanetContext } from "../context/usePlanetContext";
import "./PlanetImage.css";

const PlanetImage: React.FC = () => {
  const { currentPlanet, activeTab } = usePlanetContext();

  const getImageSrc = () => {
    const base = `/assets/planet-${currentPlanet.name.toLowerCase()}`;
    if (activeTab === "structure") {
      return `${base}-internal.svg`;
    }
    return `${base}.svg`;
  };

  const getGeologySrc = () => {
    return `/assets/geology-${currentPlanet.name.toLowerCase()}.png`;
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
          src={getGeologySrc()}
          alt="geology"
          className="geology-overlay"
        />
      )}
    </div>
  );
};

export default PlanetImage;