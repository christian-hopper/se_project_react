import "./WeatherCard.css";
import cloudy from "../../assets/cloudy.png";

function WeatherCard({ weather }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weather.temp.F} &deg;F</p>
      <img src={cloudy} alt="cloudy" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
