import "./Main.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weather, onCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weather={weather} />
      <section className="main__cards">
        <p className="main__description">
          Today is {weather.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="main__items">
          {clothingItems
            .filter((item) => item.weather === weather.type)
            .map((item) => (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
