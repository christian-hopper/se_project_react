const weatherTypes = {
  day: {
    clear: {
      url: new URL("../assets/images/clear-day.png", import.meta.url).href,
    },
    clouds: {
      url: new URL("../assets/images/clouds-day.png", import.meta.url).href,
    },
    rain: {
      url: new URL("../assets/images/rain-day.png", import.meta.url).href,
    },
    snow: {
      url: new URL("../assets/images/snow-day.png", import.meta.url).href,
    },
    fog: {
      url: new URL("../assets/images/fog-day.png", import.meta.url).href,
    },
  },
  night: {
    clear: {
      url: new URL("../assets/images/clear-night.png", import.meta.url).href,
    },
    clouds: {
      url: new URL("../assets/images/clouds-night.png", import.meta.url).href,
    },
    rain: {
      url: new URL("../assets/images/rain-night.png", import.meta.url).href,
    },
    snow: {
      url: new URL("../assets/images/snow-night.png", import.meta.url).href,
    },
    fog: {
      url: new URL("../assets/images/fog-night.png", import.meta.url).href,
    },
  },
};

const defaultWeatherTypes = {
  day: {
    url: new URL("../assets/images/default-day.png", import.meta.url).href,
    condition: "default-day",
  },
  night: {
    url: new URL("../assets/images/default-night.png", import.meta.url).href,
    condition: "default-night",
  },
};

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

const coordinates = {
  latitude: 33.9982138,
  longitude: -117.4459175,
};

const APIkey = "e9e20a175d0334bde7becd0cce5c3ca3";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.spottt.com"
    : "http://localhost:3001";

export {
  weatherTypes,
  defaultWeatherTypes,
  defaultClothingItems,
  baseUrl,
  coordinates,
  APIkey,
};
