import React, { createContext, useState, useContext, ReactNode } from "react";
import planetsData from "../data/data.json";
import { Planet } from "../types/planet";

type TabType = "overview" | "structure" | "geology";

interface PlanetContextType {
  planets: Planet[];
  currentPlanet: Planet;
  setCurrentPlanet: (planet: Planet) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

export const PlanetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [planets] = useState<Planet[]>(planetsData);
  const [currentPlanet, setCurrentPlanet] = useState<Planet>(planetsData[0]);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <PlanetContext.Provider
      value={{
        planets,
        currentPlanet,
        setCurrentPlanet,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </PlanetContext.Provider>
  );
};

export const usePlanetContext = () => {
  const context = useContext(PlanetContext);
  if (!context)
    throw new Error("usePlanetContext must be used within a PlanetProvider");
  return context;
};
