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
  const { values, handleChange, errors, isValid, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit(values);
  };

  return (
    <ModalWithForm
      titleText="New garment"
      buttonText={isLoading ? "Adding..." : "Add garment"}
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <label className="modal__label">
        Name
        <input
          name="name"
          type="text"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          required
          value={values.name || ""}
          onChange={handleChange}
          className="modal__input"
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label className="modal__label">
        Image
        <input
          name="imageUrl"
          type="url"
          placeholder="Image URL"
          required
          value={values.imageUrl || ""}
          onChange={handleChange}
          className="modal__input"
        />
        <span className="modal__error">{errors.imageUrl}</span>
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label key={type} className="modal__radio-label">
            <input
              name="weather"
              type="radio"
              value={type}
              required
              checked={values.weather === type}
              onChange={handleChange}
              className="modal__radio"
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
        <span className="modal__error">{errors.weather}</span>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
