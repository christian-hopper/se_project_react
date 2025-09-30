import { useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function AddItemModal({
  isOpen,
  isLoading,
  closeActiveModal,
  onAddItemModalSubmit,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const { name, imageUrl, weather } = values;

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), ...values };
    onAddItemModalSubmit(newItem);
  };

  const isSubmitDisabled = !name || !imageUrl || !weather;

  return (
    <ModalWithForm
      titleText="New garment"
      buttonText={isLoading ? "Adding..." : "Add garment"}
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          required
          value={name}
          onChange={handleChange}
          className="modal__input"
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          placeholder="Image URL"
          required
          value={imageUrl}
          onChange={handleChange}
          className="modal__input"
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label key={type} htmlFor={type} className="modal__radio-label">
            <input
              id={type}
              name="weather"
              type="radio"
              value={type}
              checked={weather === type}
              onChange={handleChange}
              className="modal__radio"
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
