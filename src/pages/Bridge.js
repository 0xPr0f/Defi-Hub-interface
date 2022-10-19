import React, { useEffect } from "react";
import {
  Dropdown,
  FromDropdown,
  ToDropdown,
} from "../components/Dropdown/Dropdown";
import Footer from "../components/Footer/Footer";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useState } from "react";
import "./styles/Bridge.scss";
import CustomBtn from "../components/CustomConnectBtn/CustomBtn";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Bridge = () => {
  const { search } = useLocation();
  let navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const [token, setToken] = useState("GLTV1");
  useEffect(() => {
    if (queryParams.get("token") !== "null") {
      setToken(queryParams.get("token"));
    } else {
      setToken("GLTV1");
      navigate(
        `/bridge?token=${"GLTV1"}&sourceNetwork=${queryParams.get(
          "sourceNetwork"
        )}&destNetwork=${queryParams.get("destNetwork")}`
      );
    }
  });
  const [amount, setAmount] = useState("");
  function formatToCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
      <div style={{ minHeight: "120vh" }}>
        <br />
        <div className="center fixcontent">
          <span>Send</span>
          <Dropdown className={"drop"} />
        </div>
        <br />
        <div className="swapBox center tinytext">
          <span>From</span>
          <div className="dropdownAdjust">
            <FromDropdown />
            <div>
              <span className="balance">Balance : 0{}</span>
              <div>
                <input
                  placeholder="0.0"
                  className="inputField"
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    const re = /^\d*(\.)?(\d{0,10})?$/;
                    if (e.target.value === "" || re.test(e.target.value)) {
                      setAmount(e.target.value);
                    }
                  }}
                />

                <span className="token">
                  {token !== undefined && token !== null
                    ? token.toUpperCase()
                    : null}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="center dividerArrow">
          <AiOutlineArrowDown />
        </div>
        <div className="swapBox center tinytext">
          <span>
            TO <span style={{ fontSize: "15px" }}>(estimated)</span>
          </span>
          <div className="dropdownAdjust">
            <ToDropdown />
            <div>
              <span className="balance">Balance : 0{}</span>
              <br />
              <div>
                <input
                  placeholder="0.0"
                  className="inputField null"
                  type="text"
                  value={formatToCommas(amount)}
                  disabled
                />
                <span className="token">
                  {token !== undefined && token !== null
                    ? token.toUpperCase()
                    : null}
                </span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="center approveSend">
          <CustomBtn
            className="buttonB"
            title="Approve"
            /* clickFunction={} */
          />
          <CustomBtn className="buttonB" title="Send" />
        </div>
      </div>
      <Footer />
    </>
  );
};
