import { useState, useEffect } from "react";

import "./RegisterModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onRegister, openLogin }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  const isSubmitDisabled = !name || !email || !password;

  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText="Sign up"
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      secondaryText="or Log In"
      onSecondaryClick={openLogin}
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
      <label htmlFor="name" className="modal__label">
        Name *
        <input
          id="name"
          type="text"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal__input"
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL *
        <input
          id="avatar"
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
