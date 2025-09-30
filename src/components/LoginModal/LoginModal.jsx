import { useState, useEffect } from "react";

import "./LoginModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, openRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const isSubmitDisabled = !email || !password;

  return (
    <ModalWithForm
      titleText="Log In"
      buttonText="Login"
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      secondaryText="or Sign Up"
      onSecondaryClick={openRegister}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="email" className="modal__label">
        Email *
        <input
          id="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="modal__input"
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password *
        <input
          id="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
