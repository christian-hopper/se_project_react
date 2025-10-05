import { useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import "./MobileMenu.css";
import "../../styles/common.css";
import closeIcon from "../../assets/images/close-icon.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function MobileMenu({
  onAddClick,
  isOpen,
  onClose,
  isLoggedIn,
  openAuthOverlay,
  onLogout,
}) {
  const menuRef = useRef(null);
  const currentUser = useContext(CurrentUserContext);

  const placeholderLetter = currentUser
    ? currentUser.name.charAt(0).toUpperCase()
    : "?";

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

      {isLoggedIn ? (
        <>
          <Link to="/profile" onClick={onClose} className="mobile-menu__link">
            <div className="mobile-menu__user">
              <p className="mobile-menu__username username">
                {currentUser?.name}
              </p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="User Avatar"
                  className="mobile-menu__avatar avatar"
                />
              ) : (
                <div className="mobile-menu__avatar-placeholder avatar">
                  {placeholderLetter}
                </div>
              )}
            </div>
          </Link>

          <button
            onClick={onAddClick}
            className="mobile-menu__button primary-button"
          >
            + Add clothes
          </button>

          <button
            className="mobile-menu__logout-button secondary-button"
            onClick={() => {
              onLogout();
              onClose();
            }}
          >
            Log out
          </button>

          <ToggleSwitch />
        </>
      ) : (
        <>
          <button
            onClick={() => {
              openAuthOverlay("register");
              onClose();
            }}
            className="mobile-menu__button primary-button"
          >
            Sign up
          </button>

          <button
            onClick={() => {
              openAuthOverlay("login");
              onClose();
            }}
            className="mobile-menu__button secondary-button"
          >
            Log in
          </button>

          <ToggleSwitch />
        </>
      )}
    </div>
  );
}

export default MobileMenu;
