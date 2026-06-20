import { useEffect, useState } from "react";
import LiveTracker from "./Components/LiveTracker";
import "./App.css";

const citiesData = [
  { id: 1, name: "თბილისი", temp: 25, condition: "მზიანი" },
  { id: 2, name: "ბათუმი", temp: 22, condition: "წვიმიანი" },
  { id: 3, name: "ქუთაისი", temp: 24, condition: "ღრუბლიანი" },
];

function App() {
  useEffect(() => {
    console.log("ამინდის აპლიკაცია წარმატებით ჩაიტვირთა");
  }, []);

  const [activeCity, setActiveCity] = useState(citiesData[0]);
  const [isLive, setIsLive] = useState(false);

  //იუზეფექტით შეიცვლება ტაბის სახელი. მიმდინარე ობიექტის ნეიმით
  useEffect(() => {
    document.title = `ამინდი: ${activeCity.name}`;
  }, [activeCity]);

  //ცვლადი ბექგრაუნდი შევქმნათ
  const getBackgroundClass = (condition) => {
    switch (condition) {
      case "მზიანი":
        return "bg-sunny";
      case "წვიმიანი":
        return "bg-rainy";
      case "ღრუბლიანი":
        return "bg-cloudy";
      default:
        return "";
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>ამინდის აპლიკაცია</h1>
      </header>
      {/* გადავმაპოთ ქალაქების მონაცემები, თავის ბათონიანად */}
      <div
        className={`weather-content ${getBackgroundClass(activeCity.condition)}`}
      >
        {citiesData.map((city) => (
          <button key={city.id} onClick={() => setActiveCity(city)}>
            {city.name}
          </button>
        ))}
      </div>
      <div className="city-info">
        <h3>{activeCity.name}</h3>
        <p>
          <strong>ტემპერატურა:</strong> {activeCity.temp}℃{" "}
          <strong>ამინდი:</strong> {activeCity.condition}
        </p>
      </div>
      <button className="live-btn" onClick={() => setIsLive(!isLive)}>
        {isLive ? "გამორთე Live" : "ჩართე Live"}
      </button>
      {isLive ? <LiveTracker /> : null}
    </div>
  );
}

export default App;
