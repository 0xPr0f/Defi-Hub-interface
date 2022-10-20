import React from "react";
import Footer from "../components/Footer/Footer";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useState } from "react";
import CustomBtn from "../components/CustomConnectBtn/CustomBtn";
import Blockie from "react-blockies";
import "./styles/Send.scss";

export const Send = () => {
  const [amount, setAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [toAddress, setToAddress] = useState("");

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <br />
        <br />
        <div className="center1 topcenter ">
          <span>Send</span>
        </div>
        <br />
        <div className="swapBoxsend center1 tinytextsend">
          <span>Recipient</span>
          <div className=" holder">
            <input
              placeholder="0xE1E891..."
              className="inputFieldsend address"
              type="text"
              spellCheck="false"
              value={toAddress}
              onChange={(e) => {
                const re = /(?:0[xX])?[0-9a-fA-F]+/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setToAddress(e.target.value);
                }
              }}
            />
            {toAddress.length === 42 ? (
              <Blockie
                seed={"" + toAddress + ""}
                size={10}
                scale={3}
                className="blockieaddr"
              />
            ) : null}
          </div>
        </div>
        <div className="divider"></div>
        <div className="swapBoxsend center1 tinytextsend">
          <span>Asset</span>
          <div className="dropdownAdjustsend flexout">
            <span>PHLDV</span>
            <input
              placeholder="0.0"
              className="inputFieldsend tokenvalue"
              spellCheck="false"
              type="text"
              value={amount}
              onChange={(e) => {
                const re = /^\d*(\.)?(\d{0,10})?$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setAmount(e.target.value);
                }
              }}
            />
          </div>
        </div>

        <div className="center1 approveSendsend">
          <CustomBtn className="buttonBsend" title="Send" />
        </div>
      </div>
      <Footer />
    </>
  );
};
