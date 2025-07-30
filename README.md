# WTWR - What To Wear?

WTWR is a weather-based outfit recommendation web app that helps users choose the perfect clothing items based on the current weather conditions. The app fetches live weather data for a specific location and suggests garments tailored to the temperature and weather type.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Demo

A live demo can be hosted on GitHub Pages or Vercel (link to be added once deployed).

---

## Features

- Fetches real-time weather data from OpenWeatherMap API.
- Displays current temperature in both Fahrenheit and Celsius.
- Shows the current city and date dynamically.
- Provides weather-specific outfit suggestions (hot, warm, cold).
- Allows users to add new clothing items via a modal form with fields for name, image URL, and weather type.
- Responsive design with mobile-first approach and a toggleable mobile menu.
- Preview detailed clothing item information in a modal popup.
- Keyboard accessibility: close modals with the Escape key.
- Dynamic filtering of clothing items based on the current weather type.
- Consistent and intuitive user interface with modern styling and animations.
- Error handling and loading states for API requests.
- Semantic HTML and accessibility best practices.
- Modular and reusable React components for maintainability.
- Mobile menu with smooth open/close animations.

---

## Technologies

- React (functional components, hooks)
- CSS Modules and BEM for styling
- OpenWeatherMap API for weather data
- Vite as build tool
- JavaScript (ES6+)
- Fetch API for network requests
- Accessibility standards
- Responsive web design

---

## Usage

### Viewing Weather and Outfit Suggestions

- On page load, WTWR fetches the current weather for the location and displays current city name, date, and temperature in °F and °C.
- Based on the temperature, the app categorizes the weather into hot, warm, or cold and shows outfit suggestions appropriate for that weather.

### Adding a New Clothing Item

- Click the + Add clothes button in the header or mobile menu.
- A modal form appears allowing you to enter the garment's name, provide an image URL to visually represent the item, and select the weather type this garment is suitable for: Hot, Warm, or Cold.
- Submit the form to add the garment (currently, the app updates the UI locally).
- The new garment will appear in the outfit suggestions list if its weather type matches the current weather.

### Previewing Clothing Items

- Click any clothing item card to open a modal showing more details about that garment.
- To close the preview modal, either click the close icon or press the Escape key.

### Mobile Experience

- Use the hamburger menu button in the header to toggle the mobile menu.
- The mobile menu includes the + Add clothes button and user info.
- The app is fully responsive and adapts layout based on screen size.

### Keyboard Accessibility

- You can close any open modal by pressing the Escape key.
- All interactive elements have accessible labels and proper focus management.

## Future Improvements

- Persist user-added clothing items (e.g., in localStorage or backend).
- Add validation and feedback for the add garment form.
- Enable editing and deleting of clothing items.
- Support multiple locations and user preferences.

## Author

Christian Hopper
Github: [christian-hopper](https://github.com/christian-hopper)
LinkedIn: [christian-hopper](https://www.linkedin.com/in/christian-hopper-105085369/)
Email: hopperchristian@yahoo.com
