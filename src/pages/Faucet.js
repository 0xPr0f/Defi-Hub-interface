import React, { useState } from "react";
import CustomBtn from "../components/CustomConnectBtn/CustomBtn";
import Footer from "../components/Footer/Footer";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { bridgeData } from "./Extras";
import {
  BridgeRouterBAddress,
  GLTV1AddressOnBinance,
  GLTV2AddressOnBinance,
} from "../utils/Addresses";
import { BridgeRouterBABI } from "../utils/Abis";
export const Faucet = () => {
  const [toAddress, setToAddress] = useState("");
  const { data: signer, isError, isLoading } = useSigner();

  const faucet = async () => {
    if (toAddress.length < 42) return;
    const FaucetContract = new ethers.Contract(
      BridgeRouterBAddress,
      BridgeRouterBABI,
      signer
    );
    const faucet = await FaucetContract.faucet(
      [GLTV1AddressOnBinance, GLTV2AddressOnBinance],
      toAddress
    );
    console.log(faucet.wait());
  };
  return (
    <div>
      <br />
      <br />
      <span style={{ fontSize: "40px", marginLeft: "1em" }}> Faucet</span>
      <br />
      <div className="center" style={{ minHeight: "60vh" }}>
        <br />
        <span>You will recieve 10,000 GLTV1 & GLTV2</span>
        <div>
          <br />
          <input
            placeholder="0xE1E891..."
            className="inputFieldsend address"
            type="text"
            style={{
              width: "96%",
            }}
            spellCheck="false"
            value={toAddress}
            onChange={(e) => {
              const re = /(?:0[xX])?[0-9a-fA-F]+/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setToAddress(e.target.value);
              }
            }}
          />
        </div>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomBtn clickFunction={() => faucet()} title="Request" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
