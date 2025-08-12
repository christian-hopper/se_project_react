import "./ItemModal.css";
import closeIcon from "../../assets/images/close-icon.png";

function ItemModal({ card, isOpen, closeActiveModal, openConfirmationModal }) {
  return (
    <div
      className={`modal modal--card ${isOpen ? "modal_opened" : ""}`}
      onClick={closeActiveModal}
    >
      <div className="modal__content modal__content--card">
        <button className="modal__close-button" onClick={closeActiveModal}>
          <img
            src={closeIcon}
            alt="Close"
            className="modal__close-button_image"
          />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__info">
          <div className="modal__details">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openConfirmationModal(card);
            }}
            className="modal__delete-button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
