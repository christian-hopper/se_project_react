import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { getWeather, filterWeather } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import OverlayContext from "../../contexts/OverlayContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

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

  // Overlay functions
  const openOverlay = (name) => setActiveOverlay(name);
  const closeOverlay = () => setActiveOverlay("");
  const toggleOverlay = (name) =>
    activeOverlay === name ? closeOverlay() : openOverlay(name);

  // Temperature toggle
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  };

  // Handlers for modals
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
    addItem(newItem)
      .then((addedItem) => {
        setClothingItems((items) => [addedItem, ...items]);
      })
      .catch((error) => {
        console.error("Error adding clothing item:", error);
      });
    closeOverlay();
  };
  const handleCardDelete = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        closeOverlay();
      })
      .catch((error) => {
        console.error("Error deleting clothing item:", error);
      });
  };

  // Fetch clothing items
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching clothing items:", error);
      });
  }, []);

  // Escape key closes overlay
  useEffect(() => {
    if (!activeOverlay) return;

    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [activeOverlay]);

  // Scroll lock on overlay open
  useEffect(() => {
    if (activeOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeOverlay]);

  // Fetch weather
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredWeather = filterWeather(data);
        setWeather(filteredWeather);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  return (
    <BrowserRouter basename="/se_project_react">
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
                    />
                  }
                />
              </Routes>
              <Footer />
            </div>

            <AddItemModal
              isOpen={activeOverlay === "add-clothes"}
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
              onConfirm={handleCardDelete}
              onCancel={handleCardCancel}
              closeActiveModal={closeOverlay}
            />
          </div>
        </OverlayContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
