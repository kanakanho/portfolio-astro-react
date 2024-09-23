import type { ReactElement } from "react";
import styles from "./ColorMode.module.scss";

const ColorMode = (): ReactElement => {
  const colorMode = window.localStorage.getItem("color-mode");

  if (colorMode === "light" || colorMode === "dark") {
    document.body.setAttribute("color-mode", colorMode);
  }

  const setColorModeLight = () => {
    document.body.setAttribute("color-mode", "light");
    localStorage.setItem("color-mode", "light");
  };

  const setColorModeDark = () => {
    document.body.setAttribute("color-mode", "dark");
    localStorage.setItem("color-mode", "dark");
  };

  return (
    <div className={styles.buttonBox}>
      <button className={styles.toggleButton} type="button" onClick={setColorModeLight}>
        <div className={styles.lightMode} />
      </button>
      <button className={styles.toggleButton} type="button" onClick={setColorModeDark}>
        <div className={styles.darkMode} />
      </button>
    </div>
  );
};

export default ColorMode;
