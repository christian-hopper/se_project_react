import { useEffect, useState } from "react";

import "./App.css";
import { getWeather, filterWeather } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";

function App() {
  const [weather, setWeather] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-clothes");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview-card");
    setSelectedCard(card);
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredWeather = filterWeather(data);
        setWeather(filteredWeather);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header weather={weather} handleAddClick={handleAddClick} />
        <Main weather={weather} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        titleText="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            id="name"
            type="text"
            className="modal__input"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            id="imageUrl"
            type="text"
            className="modal__input"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select the weather type</legend>
          <label htmlFor="hot" className="modal__radio-label">
            <input
              id="hot"
              type="radio"
              name="weather"
              value="hot"
              className="modal__radio"
            />
            Hot
          </label>
          <label htmlFor="warm" className="modal__radio-label">
            <input
              id="warm"
              type="radio"
              name="weather"
              value="warm"
              className="modal__radio"
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__radio-label">
            <input
              id="cold"
              type="radio"
              name="weather"
              value="cold"
              className="modal__radio"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
      />
    </div>
  );
}

export default App;
