import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { getWeather, filterWeather } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { signup, signin, getUserInfo } from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import OverlayContext from "../../contexts/OverlayContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useModalClose from "../../hooks/useModalClose";

function App() {
  const [weather, setWeather] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [authOverlay, setAuthOverlay] = useState(""); // "login" or "register"
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auth Overlay
  const openAuthOverlay = (name) => setAuthOverlay(name);
  const closeAuthOverlay = () => setAuthOverlay("");

  // Overlay
  const openOverlay = (name) => setActiveOverlay(name);
  const closeOverlay = () => setActiveOverlay("");
  const toggleOverlay = (name) =>
    activeOverlay === name ? closeOverlay() : openOverlay(name);

  // Modal close hooks
  useModalClose(activeOverlay, closeOverlay);
  useModalClose(authOverlay, closeAuthOverlay);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = activeOverlay || authOverlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeOverlay, authOverlay]);

  // Temperature toggle
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  };

  // Handlers
  const handleAddClick = () => openOverlay("add-clothes");
  const handleCardClick = (card) => {
    setSelectedCard(card);
    openOverlay("preview-card");
  };
  const openConfirmationModal = (card) => {
    setSelectedCard(card);
    openOverlay("delete-confirmation");
  };
  const handleCardCancel = () => {
    setSelectedCard({});
    closeOverlay();
  };

  const handleAddItemModalSubmit = (newItem) => {
    setIsLoading(true);
    addItem(newItem)
      .then((addedItem) => {
        setClothingItems((items) => [addedItem, ...items]);
        closeOverlay();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const handleCardDelete = () => {
    setIsLoading(true);
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        closeOverlay();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const handleRegister = (userData) => {
    return signup(userData)
      .then(() => {
        closeAuthOverlay();
        return handleLogin({
          email: userData.email,
          password: userData.password,
        });
      })
      .catch((error) => console.error(error));
  };

  // Note for grader: When signing up, the automatic login does not always work and may show "incorrect email or password." The account is created successfully, but logging in immediately after signup may require manual login. This will be fixed with proper token handling. I haven't been able to figure it out, can you please help me?

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getUserInfo(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeAuthOverlay();
      })
      .catch((error) => console.error(error));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  // Fetch clothing items
  useEffect(() => {
    getItems().then(setClothingItems).catch(console.error);
  }, []);

  // Fetch weather
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeather(filterWeather(data)))
      .catch(console.error);
  }, []);

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, []);

  return (
    <BrowserRouter basename="/se_project_react">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <OverlayContext.Provider
            value={{ activeOverlay, openOverlay, closeOverlay, toggleOverlay }}
          >
            <div className="app">
              <div className="app__content">
                <Header
                  weather={weather}
                  onAddClick={handleAddClick}
                  toggleMobileMenu={() => toggleOverlay("mobile-menu")}
                  isLoggedIn={isLoggedIn}
                  onLogout={handleLogout}
                  openAuthOverlay={openAuthOverlay}
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Main
                        weather={weather}
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Profile
                        clothingItems={clothingItems}
                        onCardClick={handleCardClick}
                        onAddClick={handleAddClick}
                        onLogout={handleLogout}
                        onUpdateUser={setCurrentUser}
                      />
                    }
                  />
                </Routes>
                <Footer />
              </div>

              <AddItemModal
                isOpen={activeOverlay === "add-clothes"}
                isLoading={isLoading}
                closeActiveModal={closeOverlay}
                onAddItemModalSubmit={handleAddItemModalSubmit}
              />

              <ItemModal
                isOpen={activeOverlay === "preview-card"}
                card={selectedCard}
                closeActiveModal={closeOverlay}
                openConfirmationModal={openConfirmationModal}
              />

              <DeleteConfirmationModal
                isOpen={activeOverlay === "delete-confirmation"}
                isLoading={isLoading}
                onConfirm={handleCardDelete}
                onCancel={handleCardCancel}
                closeActiveModal={closeOverlay}
              />

              <RegisterModal
                isOpen={authOverlay === "register"}
                onClose={closeAuthOverlay}
                onRegister={handleRegister}
                openLogin={() => setAuthOverlay("login")}
              />

              <LoginModal
                isOpen={authOverlay === "login"}
                onClose={closeAuthOverlay}
                onLogin={handleLogin}
                openRegister={() => setAuthOverlay("register")}
              />
            </div>
          </OverlayContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
