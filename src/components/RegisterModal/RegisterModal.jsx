import { useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, onRegister, openLogin, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText={isLoading ? "Signing up..." : "Sign Up"}
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      secondaryText="or Log In"
      onSecondaryClick={openLogin}
      isSubmitDisabled={!isValid || isLoading}
    >
      <label className="modal__label">
        Email *
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={values.email || ""}
          onChange={handleChange}
          className="modal__input"
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label className="modal__label">
        Password *
        <input
          name="password"
          type="password"
          placeholder="Password"
          minLength="6"
          required
          value={values.password || ""}
          onChange={handleChange}
          className="modal__input"
        />
        <span className="modal__error">{errors.password}</span>
      </label>

      <label className="modal__label">
        Name *
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
        Avatar URL
        <input
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
          className="modal__input"
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
