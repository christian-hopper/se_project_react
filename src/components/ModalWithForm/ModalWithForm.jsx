import "./ModalWithForm.css";
import closeIcon from "../../assets/images/close-icon.png";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  isOpen,
  closeActiveModal,
  onSubmit,
  secondaryText,
  onSecondaryClick,
  isSubmitDisabled = false,
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
          <div className="modal__submit-wrapper">
            <button
              type="submit"
              className={`modal__submit-button ${
                !isSubmitDisabled ? "modal__submit-button_enabled" : ""
              }`}
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
            {secondaryText && onSecondaryClick && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={onSecondaryClick}
              >
                {secondaryText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
