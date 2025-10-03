import { useState, useContext, useEffect } from "react";
import "./EditProfileModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { updateUserInfo } from "../../utils/api";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setAvatar("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    updateUserInfo({ name, avatar })
      .then((updatedUser) => {
        onUpdateUser(updatedUser);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating user info:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isSubmitDisabled = !name || !avatar;

  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText={isLoading ? "Saving Changes..." : "Save Changes"}
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name *
        <input
          id="edit-name"
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

      <label htmlFor="edit-avatar" className="modal__label">
        Avatar *
        <input
          id="edit-avatar"
          type="url"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
