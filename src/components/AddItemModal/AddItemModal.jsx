import { useState } from "react";

import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, closeActiveModal, onAddItemModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleReset = () => {
    setName("");
    setImageUrl("");
    setWeather("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      _id: Date.now().toString(),
      name,
      imageUrl,
      weather,
    };
    onAddItemModalSubmit(newItem);
    handleReset();
  };

  return (
    <ModalWithForm
      titleText="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      {/* form inputs */}
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          type="text"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          required
          value={name}
          onChange={handleNameChange}
          className="modal__input"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          id="imageUrl"
          type="text"
          placeholder="Image URL"
          required
          value={imageUrl}
          onChange={handleImageUrlChange}
          className="modal__input"
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
            checked={weather === "hot"}
            onChange={handleWeatherChange}
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
            checked={weather === "warm"}
            onChange={handleWeatherChange}
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
            checked={weather === "cold"}
            onChange={handleWeatherChange}
            className="modal__radio"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
export default AddItemModal;
