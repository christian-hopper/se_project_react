import { createContext } from "react";

const OverlayContext = createContext({
  activeOverlay: "",
  openOverlay: () => {},
  closeOverlay: () => {},
  toggleOverlay: () => {},
});

export default OverlayContext;
