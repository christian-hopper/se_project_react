import { useEffect } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onLogin, openRegister }) {
  const { values, handleChange, errors, isValid, resetForm } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      titleText="Log In"
      buttonText="Login"
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      secondaryText="or Sign Up"
      onSecondaryClick={openRegister}
      isSubmitDisabled={!isValid}
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
          required
          minLength="6"
          value={values.password || ""}
          onChange={handleChange}
          className="modal__input"
        />
        <span className="modal__error">{errors.password}</span>
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
