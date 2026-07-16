import React from "react";
import { usePlanetContext } from "../context/usePlanetContext";
import "./Tabs.css";

const Tabs: React.FC = () => {
  const { currentPlanet, activeTab, setActiveTab } = usePlanetContext();

  const getColor = (name: string) => {
    const map: Record<string, string> = {
      Mercury: "var(--color-mercury)",
      Venus: "var(--color-venus)",
      Earth: "var(--color-earth)",
      Mars: "var(--color-mars)",
      Jupiter: "var(--color-jupiter)",
      Saturn: "var(--color-saturn)",
      Uranus: "var(--color-uranus)",
      Neptune: "var(--color-neptune)",
    };
    return map[name] || "var(--color-white)";
  };

  const tabs = [
    { key: "overview" as const, label: "OVERVIEW" },
    { key: "structure" as const, label: "INTERNAL STRUCTURE" },
    { key: "geology" as const, label: "SURFACE GEOLOGY" },
  ];

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => setActiveTab(tab.key)}
          style={
            activeTab === tab.key
              ? {
                  backgroundColor: isMobile ? undefined : getColor(currentPlanet.name),
                  borderBottomColor: isMobile ? getColor(currentPlanet.name) : undefined,
                }
              : {}
          }
        >
          <span className="tab-number">
            0{tab.key === "overview" ? "1" : tab.key === "structure" ? "2" : "3"}
          </span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;