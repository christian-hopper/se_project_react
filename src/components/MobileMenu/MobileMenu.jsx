import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./MobileMenu.css";
import "../../styles/common.css";
import avatar from "../../assets/images/avatar.svg";
import closeIcon from "../../assets/images/close-icon.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function MobileMenu({ onAddClick, isOpen, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      className={`mobile-menu ${isOpen ? "mobile-menu_opened" : ""}`}
    >
      <button
        className="mobile-menu__close"
        onClick={onClose}
        aria-label="Close menu"
      >
        <img
          src={closeIcon}
          alt="Close menu"
          className="mobile-menu__close-icon"
        />
      </button>
      <Link to="/profile" onClick={onClose} className="mobile-menu__link">
        <div className="mobile-menu__user">
          <p className="mobile-menu__username username">User Name</p>
          <img
            src={avatar}
            alt="User Avatar"
            className="mobile-menu__avatar avatar"
          />
        </div>
      </Link>
      <button
        onClick={onAddClick}
        className="mobile-menu__button add-clothes-button"
      >
        + Add clothes
      </button>
      <ToggleSwitch />
    </div>
  );
}

export default MobileMenu;
