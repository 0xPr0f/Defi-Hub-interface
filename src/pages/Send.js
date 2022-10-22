import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import { AiOutlineArrowDown } from "react-icons/ai";

import { useState } from "react";
import CustomBtn from "../components/CustomConnectBtn/CustomBtn";
import Blockie from "react-blockies";
import "./styles/Send.scss";
import Modal from "../components/Modal/Modal";
import { erc20ABI, useAccount, useSigner } from "wagmi";
import { TokenSelectBtn } from "../components/TokenSelect/TokenSelect";
import { getErc20Assets } from "../CovalentAPI/CovalentAPI";
import { getEllipsisTxt } from "../App";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { BigNumber, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useFeeData } from "wagmi";

export const Send = () => {
  const [show, setShow] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [amount, setAmount] = useState("");
  const [currentTokenImage, setCurrentTokenImage] = useState("");
  const [currentTokenSymbol, setCurrentTokenSymbol] = useState("Select Token");
  const [tokenAddress, setTokenAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [tokenDecimal, setTokenDecimal] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [acountBalance, setAcountBalance] = useState([]);
  const { data } = useFeeData({
    chainId: 97,
    watch: true,
    formatUnits: "gwei",
  });

  const SendTrasaction = async (
    tokenaddress,
    toaddress,
    value,
    tokendecimal
  ) => {
    const ERC20Contract = new ethers.Contract(tokenaddress, erc20ABI, signer);
    const FormatedValue = parseUnits("" + value * 10 ** tokendecimal + "");
    console.log(FormatedValue);
    console.log("----------------------------------------------------------");
    const sentvalue = FormatedValue.toString();
    console.log(sentvalue);
    const tokentransfer = await ERC20Contract.transfer(toaddress, sentvalue);
    console.log(tokentransfer.wait());
  };

  const accountload = async () => {
    if (isConnected && address !== undefined && address.length >= 42) {
      const lol = await getErc20Assets(address, 1);
      setAcountBalance(lol);
    }
  };

  useEffect(() => {
    if (isConnected && address !== undefined && address.length >= 42) {
      accountload();
    }
  });
  useEffect(() => {
    if (show === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

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
          <div className="swapBoxsendAssets">
            <span>Asset</span>
            <span
              onClick={() => {
                setAmount(tokenBalance);
              }}
            >
              max
            </span>
          </div>
          <div className="dropdownAdjustsend flexout">
            <span className="currenttoken" onClick={() => setShow(true)}>
              {tokenAddress ? (
                <img width="30px" height="30px" src={currentTokenImage} />
              ) : null}
              <span>{currentTokenSymbol}</span>
              <KeyboardArrowDownIcon />
            </span>

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
        {toAddress.length === 42 ? (
          <div className="center1 estimategas">
            <span>Network fee</span>
            <span>{data?.formatted.gasPrice}&nbsp; GWEI</span>
          </div>
        ) : null}
        <div className="center1 approveSendsend">
          <br />
          <CustomBtn
            clickFunction={() => {
              SendTrasaction(tokenAddress, toAddress, amount, tokenDecimal);
              console.log(
                `send details are token address : ${tokenAddress}, user address :${address}, value : ${amount}, Decimal ${tokenDecimal}`
              );
            }}
            className="buttonBsend"
            title="Send"
          />
        </div>
        <Modal
          title={"Select a Token"}
          show={show}
          size="large"
          onClose={() => setShow(false)}
          backCLoseFunction={() => setShow(false)}
        >
          {acountBalance.map((bal, index) => (
            <TokenSelectBtn
              clickFunction={() => {
                setShow(false);
                setCurrentTokenImage(bal.logo_url);
                setTokenAddress(bal.contract_address);
                setCurrentTokenSymbol(bal.contract_ticker_symbol);
                setTokenDecimal(bal.contract_decimals);
                setTokenBalance(
                  (bal.balance * 10 ** -bal.contract_decimals).toFixed(3)
                );
                console.log(currentTokenSymbol);
              }}
              key={index}
              name={bal.contract_name}
              symbol={
                bal.contract_ticker_symbol.length > 10
                  ? getEllipsisTxt(bal.contract_ticker_symbol, 5)
                  : bal.contract_ticker_symbol
              }
              image={bal.logo_url}
              balance={(bal.balance * 10 ** -bal.contract_decimals).toFixed(3)}
            />
          ))}
        </Modal>
      </div>
      <Footer />
    </>
  );
};
