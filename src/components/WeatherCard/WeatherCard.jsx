import "./WeatherCard.css";
import { weatherTypes, defaultWeatherTypes } from "../../utils/constants";

function WeatherCard({ weather }) {
  let weatherData = weather.isDay
    ? weatherTypes.day[weather.condition]
    : weatherTypes.night[weather.condition];
  if (!weatherData) {
    weatherData = defaultWeatherTypes[weather.isDay ? "day" : "night"];
  }

  // Note to Reviewer: For some reason, myWeatherCard is not being displayed correctly on my webpage. In the console.log statement I left, you can see that the link and file path are correct and successfully created. How do I fix this?

  console.log("Image URL for clear night:", weatherTypes.night.clear.url);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weather.temp.F} &deg;F</p>
      <img
        src={weatherData?.url}
        alt={`Card showing ${weatherData?.day ? "day" : "night"} ${
          weatherData?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
