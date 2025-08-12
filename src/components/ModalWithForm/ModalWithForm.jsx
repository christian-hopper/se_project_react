import "./ModalWithForm.css";
import closeIcon from "../../assets/images/close-icon.png";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  isOpen,
  closeActiveModal,
  onSubmit,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={closeActiveModal}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{titleText}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close-button"
        >
          <img
            src={closeIcon}
            alt="Close"
            className="modal__close-button_image"
          />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
