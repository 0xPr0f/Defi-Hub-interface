import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import { FaTimes } from "react-icons/fa";

export default function Modal({
  title,
  show,
  onClose,
  children,
  backCLoseFunction,
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

  return (
    <>
      <div className={styles.center}>
        <div id="CustommyModal" className={styles.Compmodal}>
          <div className={styles.Compmodalcontent}>
            <div className={styles.titleHeader}>
              <span className={styles.titleText}>{title}</span>
              <span onClick={onClose} className={styles.Compclose}>
                <FaTimes />
              </span>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
