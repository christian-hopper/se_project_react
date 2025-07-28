export const getWeather = (location, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${APIkey}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}`);
    }
  });
};

export const filterWeather = (data) => {
  const result = {};
  result.city = data.name;
  result.type = getWeatherType(data.main.temp);
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round((data.main.temp - 32) * (5 / 9)),
  };
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDayTime({
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  });
  return result;
};

const getWeatherType = (temp) => {
  if (temp >= 80) {
    return "hot";
  } else if (temp >= 60 && temp < 80) {
    return "warm";
  } else {
    return "cold";
  }
};

const getCurrentTime = () => {
  return Math.floor(Date.now() / 1000);
};

const isDayTime = ({ sunrise, sunset, now }) => {
  return now >= sunrise && now < sunset;
};
