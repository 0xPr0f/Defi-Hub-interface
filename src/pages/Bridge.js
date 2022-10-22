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
import { useSigner, useAccount, erc20ABI } from "wagmi";
import {
  BridgeRouterBAddress,
  BridgeRouterPAddress,
  GLTV1AddressOnBinance,
  GLTV1AddressOnPolygon,
  GLTV2AddressOnBinance,
  GLTV2AddressOnPolygon,
} from "../utils/Addresses";
import { BridgeRouterBABI } from "../utils/Abis";
import { ethers } from "ethers";
import { useBalance } from "wagmi";

export const Bridge = () => {
  const { search } = useLocation();
  let navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const [token, setToken] = useState("GLTV1");
  const [allowance, setAllowance] = useState("20000");
  const [BalanceGLTVP, setBalanceGLTVP] = useState("0");
  const [BalanceGLTVB, setBalanceGLTVB] = useState("0");
  const { data: signer, isError, isLoading } = useSigner();
  const { address } = useAccount();
  // a pair
  const balanceGLTV1p = useBalance({
    addressOrName: address,
    chainId: 80001,
    token: GLTV1AddressOnPolygon,
    watch: true,
  });
  const balanceGLTV1b = useBalance({
    addressOrName: address,
    chainId: 97,
    token: GLTV1AddressOnBinance,
    watch: true,
  });
  //--------------------------------
  /////// Another pair
  const balanceGLTV2p = useBalance({
    addressOrName: address,
    chainId: 80001,
    token: GLTV2AddressOnPolygon,
    watch: true,
  });
  const balanceGLTV2b = useBalance({
    addressOrName: address,
    chainId: 97,
    token: GLTV1AddressOnBinance,
    watch: true,
  });
  //======================================

  useEffect(() => {
    if (token === null) {
      window.location.reload();
      setToken("GLTV1");
      navigate(`/bridge?token=GLTV1&sourceNetwork=BSCTN&destNetwork=POLYTN`);
    }
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
  /*
  useEffect(() => {
    checkAllowance();
  });

 const checkAllowance = async () => {
    if (token === "GLTV1") {

      setBalanceGLTVP(balanceGLTV1p);
      setBalanceGLTVB(balanceGLTV1b);

      const ERC20Contract = new ethers.Contract(
        GLTV1AddressOnBinance,
        erc20ABI,
        signer
      );
      const tokenAllowance = await ERC20Contract.allowance(
        address,
        BridgeRouterBAddress
      );
      setAllowance(tokenAllowance);
    }
    if (token === "GLTV2") {

      setBalanceGLTVP(balanceGLTV2p);
      setBalanceGLTVB(balanceGLTV2b);

      const ERC20Contract = new ethers.Contract(
        GLTV2AddressOnBinance,
        erc20ABI,
        signer
      );
      const tokenAllowance = await ERC20Contract.allowance(
        address,
        BridgeRouterBAddress
      );
      setAllowance(tokenAllowance);
      console.log(allowance);
    }
  };
  const Approve = async () =>{
      if (token === "GLTV1") {
      const ERC20Contract = new ethers.Contract(
        GLTV1AddressOnBinance,
        erc20ABI,
        signer
      );
      const tokenApprove = await ERC20Contract.approve(
        BridgeRouterBAddress,
        "1000000000000000"
      );
      console.log(tokenApprove.wait());
      }
        if (token === "GLTV2") {
 const ERC20Contract = new ethers.Contract(
        GLTV2AddressOnBinance,
        erc20ABI,
        signer
      );

      const tokenApprove = await ERC20Contract.approve(
        BridgeRouterBAddress,
        "1000000000000000"
      );
      console.log(tokenApprove.wait());
        }
  }

  const Bridge = async () => {
    if (token === "GLTV1") {
      console.log(`sent : ${amount} GLTV1 to ploygon chain `);
      const BridgeContract = new ethers.Contract(
        BridgeRouterBAddress,
        BridgeRouterBABI,
        signer
      );
      const bridge = await BridgeContract.bridgeToken(
        "Polygon",
        BridgeRouterPAddress,
        GLTV1AddressOnPolygon,
        amount,
        address
      );
      console.log(bridge.wait());
    }
    if (token === "GLTV2") {
      console.log(`sent : ${amount} GLTV2 to ploygon chain `);
      const BridgeContract = new ethers.Contract(
        BridgeRouterBAddress,
        BridgeRouterBABI,
        signer
      );
     
      const bridge = await BridgeContract.bridgeToken(
        "Polygon",
        BridgeRouterPAddress,
        GLTV2AddressOnPolygon,
        amount,
        address
      );
      console.log(bridge.wait());
    }
  };
*/
  return (
    <>
      <div style={{ minHeight: "120vh" }}>
        <br />
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
              <span className="balance">Balance : {BalanceGLTVB}</span>
              <div>
                <input
                  placeholder="0.0"
                  className="inputField"
                  type="text"
                  spellCheck="false"
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
              <span className="balance">Balance : {BalanceGLTVP}</span>
              <br />
              <div>
                <input
                  placeholder="0.0"
                  className="inputField null"
                  type="text"
                  spellCheck="false"
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
          {allowance > amount ? (
            <CustomBtn
              clickFunction={() => {
                Bridge();
              }}
              className="buttonB"
              title="Approve"
              /* clickFunction={} */
            />
          ) : null}
          <CustomBtn
            clickFunction={() => {
              Bridge();
            }}
            className="buttonB"
            title="Send"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
