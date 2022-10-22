import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import { FaTimes } from "react-icons/fa";

export default function Modal({
  title,
  show,
  onClose,
  children,
  backCLoseFunction,
  size,
}) {
  useEffect(() => {
    if (show === true) {
      document.getElementById("CustommyModal").style.display = "block";
    } else {
      document.getElementById("CustommyModal").style.display = "none";
    }
  });
  const closeWin = backCLoseFunction;
  window.onclick = function (event) {
    if (event.target === document.getElementById("CustommyModal")) {
      closeWin();
      document.getElementById("CustommyModal").style.display = "none";
    }
  };

  useEffect(() => {
    if (size === "small") {
      document.getElementById("scrollable").style.height = 35 + "%";
    } else if (size === "medium") {
      document.getElementById("scrollable").style.height = 50 + "%";
    } else if (size === "large") {
      document.getElementById("scrollable").style.height = 60 + "%";
    } else {
      document.getElementById("scrollable").style.height = 55 + "%";
    }
  });
  return (
    <>
      <div className={styles.center}>
        <div id="CustommyModal" className={styles.Compmodal}>
          <div id="scrollable" className={styles.Compmodalcontent}>
            <div className={styles.titleHeader}>
              <span className={styles.titleText}>{title}</span>
              <span onClick={onClose} className={styles.Compclose}>
                <FaTimes />
              </span>
            </div>
            <div className={styles.mainContenttoScroll}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
