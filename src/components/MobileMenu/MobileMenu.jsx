import "./MobileMenu.css";
import "../../styles/common.css";
import avatar from "../../assets/images/avatar.svg";

function MobileMenu({ handleAddClick, isOpen }) {
  return (
    <div className={`mobile-menu ${isOpen ? "mobile-menu_opened" : ""}`}>
      <div className="mobile-menu__user">
        <p className="mobile-menu__username username">User Name</p>
        <img
          src={avatar}
          alt="User Avatar"
          className="mobile-menu__avatar avatar"
        />
      </div>
      <button
        onClick={handleAddClick}
        className="mobile-menu__button add-clothes-button"
      >
        + Add clothes
      </button>
    </div>
  );
}

export default MobileMenu;
