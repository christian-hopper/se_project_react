import { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import "../../styles/common.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/images/logo.svg";
import hamburgerIcon from "../../assets/images/hamburger-icon.svg";

import OverlayContext from "../../contexts/OverlayContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  weather,
  onAddClick,
  openAuthOverlay,
  isLoggedIn,
  onLogout,
}) {
  const { activeOverlay, toggleOverlay, closeOverlay } =
    useContext(OverlayContext);
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const placeholderLetter = currentUser
    ? currentUser.name.charAt(0).toUpperCase()
    : "?";

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

      {isLoggedIn ? (
        <>
          <button
            onClick={onAddClick}
            className="header__add-clothes-button primary-button"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__profile-link">
            <div className="header__user-container">
              <p className="header__username secondary-button">
                {currentUser?.name}
              </p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="User Avatar"
                  className="header__avatar avatar"
                />
              ) : (
                <div className="header__avatar-placeholder avatar">
                  {placeholderLetter}
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={() => openAuthOverlay("register")}
            className="header__signup-button primary-button"
          >
            Sign up
          </button>
          <button
            onClick={() => openAuthOverlay("login")}
            className="header__login-button secondary-button"
          >
            Log in
          </button>
        </>
      )}

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={activeOverlay === "mobile-menu"}
        onAddClick={onAddClick}
        onClose={closeOverlay}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        openAuthOverlay={openAuthOverlay}
      />
    </header>
  );
}

export default Header;
