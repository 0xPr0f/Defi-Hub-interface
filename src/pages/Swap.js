import React, { useState } from "react";
import Footer from "../components/Footer/Footer";
import VaultView from "./VaultView";
import Modal from "../components/Modal/Modal";

export const Swap = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      <div className="center" style={{ minHeight: "80vh" }}>
        <div>Swap</div>
        <img src="https://gateway.pinata.cloud/ipfs/QmZnRxkRrxjhbAQfpaVGh9uqDBzf6yMprnLNjwaVsReXxV" />
        <span style={{ fontSize: "40px" }}>Steady lads</span>
      </div>
      <Modal
        size="medium"
        title={"Info"}
        show={show}
        onClose={() => setShow(false)}
        backCLoseFunction={() => setShow(false)}
      >
        <span>
          Due to the lack of liquidity pools (with enough assets) on testnet.
        </span>
        <br />
        <br />
        <span>
          This page will not live on testnet and will not be displayed for the
          hackathon, the page will be live when we migrate to mainnet
        </span>
      </Modal>

      <VaultView />

      <Footer />
    </>
  );
};
