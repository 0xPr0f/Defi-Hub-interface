import React from "react";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import Modal from "../components/Modal/Modal";

export const Earn = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <div className="center" style={{ minHeight: "120vh" }}>
        Earn
        <button
          onClick={() => {
            setShow(true);
            console.log("show modal");
          }}
        >
          Show Modal
        </button>
      </div>
      <Modal
        title={"Vault"}
        show={show}
        onClose={() => setShow(false)}
        backCLoseFunction={() => setShow(false)}
      >
        <span>soup ius sweet</span>
        <span>soup ius sweet</span>
        <span>soup ius sweet</span>
        <span>soup ius sweet</span>
        <span>soup ius sweet</span>
      </Modal>
      <Footer />
    </>
  );
};
