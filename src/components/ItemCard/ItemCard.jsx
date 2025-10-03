import "./ItemCard.css";
import likeButtonGray from "../../assets/images/like-button-gray.png";
import likeButtonBlack from "../../assets/images/like-button-black.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => onCardClick(item);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li key={item._id} className="cards__item" onClick={handleCardClick}>
      <div className="cards__header">
        <h2 className="cards__name">{item.name}</h2>
        {currentUser && (
          <button
            type="button"
            className={"cards__like-button"}
            onClick={handleLike}
          >
            <img
              src={isLiked ? likeButtonBlack : likeButtonGray}
              alt="Like button"
              className="cards__like-button_image"
            />
          </button>
        )}
      </div>
      <img src={item.imageUrl} alt={item.name} className="cards__image" />
    </li>
  );
}

export default ItemCard;
