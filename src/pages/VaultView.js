import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CustomBtn from "../components/CustomConnectBtn/CustomBtn";
import "./styles/VaultView.scss";

const VaultView = () => {
  const { vault_address } = useParams();
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div>
      VaultView
      <div>
        <span>Vault details</span>
        <div>
          <span> addresstokenVault : Vault details</span>
          <br />
          <span>vaultOwner : Vault details</span>
          <br />
          <span>lock createdBalance : Vault details</span>
          <br />
          <span>lockStartTime : Vault details</span>
          <br />
          <span>lockEndTime : Vault details</span>
        </div>
      </div>
      <div>
        if time is over, redraw funds
        <br />
        <br />
        <br />
        <div className="WithdrawBox">
          <div className="withdrawToken">
            withdraw Token
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
            <CustomBtn
              /*clickFunction={() => write?.()} */ title="Redraw Token"
            />
          </div>
          <div className="withdrawEth">
            <span>withdraw BNB</span>
            <br />
            <input
              placeholder="0.0"
              className={"inputFieldsend tokenAmount"}
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
            <CustomBtn
              /*clickFunction={() => write?.()} */ title="Redraw BNB"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultView;
