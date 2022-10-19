import React from "react";
import { Dropdown } from "../components/Dropdown/Dropdown";
import Footer from "../components/Footer/Footer";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useState } from "react";
import "./styles/Bridge.scss";

export const Bridge = () => {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("matic");
  return (
    <>
      <div className="center" style={{ minHeight: "120vh" }}>
        Bridge
        <div className="swapBox tinytext">
          <span>From</span>
          <div className="dropdownAdjust">
            <Dropdown />
            <div>
              <input
                placeholder="0.0"
                className="inputField"
                type="text"
                value={amount}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === "" || re.test(e.target.value)) {
                    setAmount(e.target.value);
                  }
                }}
              />
              <span className="token"> {token.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="dividerArrow">
          <AiOutlineArrowDown />
        </div>
        <div className="swapBox tinytext">
          <span>
            TO <span style={{ fontSize: "15px" }}>(estimated)</span>
          </span>
          <div className="dropdownAdjust">
            <Dropdown />
            <div>
              <input
                placeholder="0.0"
                className="inputField null"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled
              />
              <span className="token"> {token.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
