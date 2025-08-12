import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherTypes, defaultWeatherTypes } from "../../utils/constants";

function WeatherCard({ weather }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  let weatherData = weather.isDay
    ? weatherTypes.day[weather.condition]
    : weatherTypes.night[weather.condition];
  if (!weatherData) {
    weatherData = defaultWeatherTypes[weather.isDay ? "day" : "night"];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weather.temp[currentTemperatureUnit]} &deg;{currentTemperatureUnit}
      </p>
      <img
        src={weatherData?.url}
        alt={`Card showing that it's currently ${
          weatherData.day ? "day" : "night"
        } with ${weather.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
