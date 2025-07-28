import "./ItemModal.css";
import closeIcon from "../../assets/close-icon.png";

function ItemModal({ card, activeModal, closeActiveModal }) {
  return (
    <div
      className={`modal modal--card ${
        activeModal === "preview-card" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__content modal__content--card">
        <button className="modal__close-button" onClick={closeActiveModal}>
          <img
            src={closeIcon}
            alt="Close"
            className="modal__close-button_image"
          />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__details">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
