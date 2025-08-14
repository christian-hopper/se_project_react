import { useEffect } from "react";

function useModalClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [isOpen, onClose]);
}

export default useModalClose;
