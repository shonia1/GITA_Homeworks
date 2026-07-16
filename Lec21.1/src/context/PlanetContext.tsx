import React, { createContext, useState, type ReactNode } from "react";
import planetsData from "../data/data.json";
import type { Planet } from "../types/planet";

export type TabType = "overview" | "structure" | "geology";

interface PlanetContextType {
  planets: Planet[];
  currentPlanet: Planet;
  setCurrentPlanet: (planet: Planet) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const PlanetContext = createContext<PlanetContextType | undefined>(
  undefined
);

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