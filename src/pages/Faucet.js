import React, { useState } from "react";
import CustomBtn from "../components/CustomConnectBtn/CustomBtn";
import Footer from "../components/Footer/Footer";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { faucetAbi } from "../utils/Abis";
import { BridgeRouterBAddress } from "../utils/Addresses";

export const Faucet = () => {
  /* const { config } = usePrepareContractWrite({
    address: BridgeRouterBAddress,
    abi: faucetAbi,
    functionName: "faucet",
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
*/
  const [toAddress, setToAddress] = useState("");
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
          <CustomBtn /*clickFunction={() => write?.()} */ title="Request" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
