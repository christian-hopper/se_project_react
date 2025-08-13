import { useContext } from "react";

import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch({ className }) {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className={`toggle-switch ${className}`}>
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "C"}
        aria-label="Toggle temperature unit"
      />
      <span className="toggle-switch__slider"></span>
      <span className="toggle-switch__label toggle-switch__label_f">F</span>
      <span className="toggle-switch__label toggle-switch__label_c">C</span>
    </label>
  );
}

export default ToggleSwitch;
