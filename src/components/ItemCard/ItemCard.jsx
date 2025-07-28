import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  const onCardClick = () => {
    handleCardClick(item);
  };

  return (
    <li key={item._id} className="cards__item" onClick={onCardClick}>
      <h2 className="cards__name">{item.name}</h2>
      <img src={item.link} alt={item.name} className="cards__image" />
    </li>
  );
}

export default ItemCard;
