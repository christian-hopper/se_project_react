import "./Profile.css";
import Sidebar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onAddClick, onCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddClick={onAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
