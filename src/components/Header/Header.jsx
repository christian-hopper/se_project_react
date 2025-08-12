import { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import "../../styles/common.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";
import hamburgerIcon from "../../assets/images/hamburger-icon.svg";

import OverlayContext from "../../contexts/OverlayContext";

function Header({ weather, onAddClick }) {
  const { activeOverlay, toggleOverlay, closeOverlay } =
    useContext(OverlayContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo-container">
        <div className="header__logo-block">
          <Link to="/" className="header__logo-link">
            <img
              src={logo}
              alt="WTWR - What to Wear?"
              className="header__logo"
            />
          </Link>
          <p className="header__date-location">
            {currentDate}, {weather.city}
          </p>
        </div>

        {/* Mobile View */}
        {activeOverlay !== "mobile-menu" && (
          <button
            onClick={() => toggleOverlay("mobile-menu")}
            aria-label="Open menu"
            className="header__menu-toggle"
          >
            <img
              src={hamburgerIcon}
              alt="Open menu"
              className="header__menu-icon"
            />
          </button>
        )}
      </div>

      {/* Desktop View */}
      <ToggleSwitch className="header__toggle-switch" />
      <button
        onClick={onAddClick}
        className="header__add-clothes-button add-clothes-button"
      >
        + Add clothes
      </button>

      <Link to="/profile" className="header__profile-link">
        <div className="header__user-container">
          <p className="header__username username">User Name</p>
          <img
            src={avatar}
            alt="User Avatar"
            className="header__avatar avatar"
          />
        </div>
      </Link>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={activeOverlay === "mobile-menu"}
        onAddClick={onAddClick}
        onClose={closeOverlay}
      />
    </header>
  );
}

export default Header;
