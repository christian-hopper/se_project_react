import "./Header.css";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";

function Header({ handleAddClick, weather }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="WTWR - What to Wear?" className="header__logo" />
      <p className="header__date-location">
        {currentDate}, {weather.city}
      </p>
      <button onClick={handleAddClick} className="header__add-clothes-button">
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">User Name</p>
        <img src={avatar} alt="User Avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
