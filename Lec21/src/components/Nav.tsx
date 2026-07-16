import React, { useState } from "react";
import { usePlanetContext } from "../context/usePlanetContext";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav: React.FC = () => {
  const { planets, currentPlanet } = usePlanetContext();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePlanetClick = (planet: (typeof planets)[0]) => {
    setMenuOpen(false);
    navigate(`/${planet.name.toLowerCase()}`);
  };

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

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

  return (
    <nav className="nav">
      <div className="nav-logo">THE PLANETS</div>
      <button className="hamburger" onClick={handleToggle}>
        ☰
      </button>

      <ul className="nav-list">
        {planets.map((planet) => (
          <li
            key={planet.name}
            className={`nav-item ${currentPlanet.name === planet.name ? "active" : ""}`}
            onClick={() => handlePlanetClick(planet)}
            style={{
              borderBottomColor:
                currentPlanet.name === planet.name
                  ? getColor(planet.name)
                  : "transparent",
            }}
          >
            <span
              className="nav-dot"
              style={{ backgroundColor: getColor(planet.name) }}
            ></span>
            {planet.name}
          </li>
        ))}
      </ul>

      {/* მობილური მენიუ */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {planets.map((planet) => (
          <div
            key={planet.name}
            className="mobile-menu-item"
            onClick={() => handlePlanetClick(planet)}
            onTouchStart={() => handlePlanetClick(planet)} // მობილურისთვის
          >
            <span
              className="mobile-menu-dot"
              style={{ backgroundColor: getColor(planet.name) }}
            ></span>
            <span className="mobile-menu-name">{planet.name}</span>
            <span className="mobile-menu-arrow">›</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
