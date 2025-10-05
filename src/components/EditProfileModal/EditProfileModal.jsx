import { useEffect, useContext } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { updateUserInfo } from "../../utils/api";
import useForm from "../../hooks/useForm";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useForm({ name: "", avatar: "" });

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo(values)
      .then((updatedUser) => {
        onUpdateUser(updatedUser);
        onClose();
      })
      .catch((error) => console.error("Error updating user info:", error));
  };

  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText="Save Changes"
      isOpen={isOpen}
      closeActiveModal={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name *
        <input
          id="edit-name"
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

      <label htmlFor="edit-avatar" className="modal__label">
        Avatar URL
        <input
          id="edit-avatar"
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

export default EditProfileModal;
