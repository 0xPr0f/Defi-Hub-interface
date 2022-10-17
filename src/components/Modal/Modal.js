import React, { useEffect } from "react";
import "./Modal.module.scss";

const Modal = ({ show }) => {
  // When the user clicks on <span> (x), close the modal
  useEffect(() => {
    if (show === true) {
      document.getElementById("myModal").style.display = "block";
    } else {
      document.getElementById("myModal").style.display = "none";
    }
  });

  window.onclick = function (event) {
    if (event.target === document.getElementById("myModal")) {
      document.getElementById("myModal").style.display = "none";
    }
  };
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span
          onClick={() =>
            (document.getElementById("myModal").style.display = "none")
          }
          className="close"
        >
          &times;
        </span>
        Test text Test text Test text Test text
        <div className="modal-body"></div>
      </div>
    </div>
  );
};

export default Modal;
