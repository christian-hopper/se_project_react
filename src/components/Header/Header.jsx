import { useState } from "react";

import "./Header.css";
import "../../styles/common.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";
import hamburgerIcon from "../../assets/images/hamburger-icon.svg";
import closeIcon from "../../assets/images/close-icon.png";

function Header({ handleAddClick, weather }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo-container">
        <div className="header__logo-block">
          <img src={logo} alt="WTWR - What to Wear?" className="header__logo" />

          <p className="header__date-location">
            {currentDate}, {weather.city}
          </p>
        </div>

        {/* Mobile View */}
        <button
          className="header__menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <img
            src={mobileMenuOpen ? closeIcon : hamburgerIcon}
            alt={mobileMenuOpen ? "Close menu" : "Open menu"}
            className={
              mobileMenuOpen ? "header__close-icon" : "header__menu-icon"
            }
          />
        </button>
      </div>

      {/* Desktop View */}
      <button
        onClick={handleAddClick}
        className="header__add-clothes-button add-clothes-button"
      >
        + Add clothes
      </button>

      <div className="header__user-container">
        <p className="header__username username">User Name</p>
        <img src={avatar} alt="User Avatar" className="header__avatar avatar" />
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} handleAddClick={handleAddClick} />
    </header>
  );
}

export default Header;
