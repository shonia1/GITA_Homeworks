import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import { PlanetProvider } from "./context/PlanetContext";
import { usePlanetContext } from "./context/usePlanetContext";
import Nav from "./components/Nav";
import PlanetDetail from "./components/PlanetDetail";
import "./App.css";

// კომპონენტი, რომელიც აკონტროლებს პარამეტრს
const PlanetController: React.FC = () => {
  const { planetName } = useParams<{ planetName: string }>();
  const { planets, setCurrentPlanet, setActiveTab } = usePlanetContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (planetName) {
      const found = planets.find(
        (p) => p.name.toLowerCase() === planetName.toLowerCase(),
      );
      if (found) {
        setCurrentPlanet(found);
        setActiveTab("overview");
      } else {
        navigate("/mercury", { replace: true });
      }
    } else {
      navigate("/mercury", { replace: true });
    }
  }, [planetName, planets, setCurrentPlanet, setActiveTab, navigate]);

  return <PlanetDetail />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PlanetProvider>
        <div className="app">
          <Nav />
          <Routes>
            <Route path="/:planetName" element={<PlanetController />} />
            <Route path="/" element={<PlanetController />} />
          </Routes>
        </div>
      </PlanetProvider>
    </BrowserRouter>
  );
};

export default App;
