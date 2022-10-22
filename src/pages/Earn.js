import React from "react";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import Modal from "../components/Modal/Modal";

export const Earn = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <div className="center" style={{ minHeight: "80vh" }}>
        Earn
        <img src="https://gateway.pinata.cloud/ipfs/QmZnRxkRrxjhbAQfpaVGh9uqDBzf6yMprnLNjwaVsReXxV" />
        <span style={{ fontSize: "40px" }}>
          Still in production, Devs at work
        </span>
      </div>
      <Modal
        size="medium"
        title={"Info"}
        show={show}
        onClose={() => setShow(false)}
        backCLoseFunction={() => setShow(false)}
      >
        <span>This page is still currently under production.</span>
        <br />
        <br />
        <span>
          When done, Binance smart chain users can get the highest APY on
          lending/supplying and low interests on borrowing, this will be cross
          chain supply and borrowing.
        </span>
      </Modal>
      <Footer />
    </>
  );
};
