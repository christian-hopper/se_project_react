import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/images/close-icon.png";

function DeleteConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  closeActiveModal,
}) {
  if (!isOpen) return null;

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={closeActiveModal}
    >
      <div onClick={(e) => e.stopPropagation()} className="delete-confirmation">
        <img
          onClick={onCancel}
          src={closeIcon}
          alt="Close"
          className="delete-confirmation__close-button"
        />
        <div className="delete-confirmation__content">
          <div className="delete-confirmation__title">
            <h2 className="delete-confirmation__message">
              Are you sure you want to delete this item?
            </h2>
            <p className="delete-confirmation__message">
              This action is irreversible.
            </p>
          </div>
          <div className="delete-confirmation__actions">
            <button
              onClick={onConfirm}
              className="delete-confirmation__confirm-button"
            >
              Yes, delete item
            </button>
            <button
              onClick={onCancel}
              className="delete-confirmation__cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
