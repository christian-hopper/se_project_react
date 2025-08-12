import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li key={item._id} className="cards__item" onClick={handleCardClick}>
      <h2 className="cards__name">{item.name}</h2>
      <img src={item.imageUrl} alt={item.name} className="cards__image" />
    </li>
  );
}

export default ItemCard;
