import "./App.css";
import { useState, useEffect } from "react";
import Modal from "./components/Modal/Modal";
import ConnectionGrid from "./components/ConnectionGrid/ConnectionGrid";
import { useAccount, useEnsAvatar, useEnsName, useDisconnect } from "wagmi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Routes, Route, Link } from "react-router-dom";

import { Overview } from "./pages/Overview";
import { Send } from "./pages/Send";
import { Swap } from "./pages/Swap";
import { Vault } from "./pages/Vault";
import { NFTView } from "./pages/NFTView";

function App() {
  // const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  // const { data: ensName } = useEnsName({ address });
  const { address, connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  /* if (isConnected) {
    console.log(connector);
    return (
      <div>
        <img src={ensAvatar} alt="ENS Avatar" />
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        {connector ? <div>Connected to {connector.name}</div> : <></>}
        <br />
        <button> disconnect</button>
      </div>
    );
  }
*/
  // When the user clicks anywhere outside of the modal, close it

  useEffect(() => {
    if (isConnected) {
      document.getElementById("myModal").style.display = "none";
    }
  });

  window.onclick = function (event) {
    if (event.target === document.getElementById("myModal")) {
      document.getElementById("myModal").style.display = "none";
    }
  };
  return (
    <div className="App">
      <div className="sidenav">
        {!isConnected ? (
          <span
            onClick={() => {
              if (!isConnected) {
                document.getElementById("myModal").style.display = "block";
              }
            }}
            className="connect"
          >
            Connect
          </span>
        ) : (
          <div className="buttonlol">
            <span className="connect ">{getEllipsisTxt(address, 5)}</span>
            <RiArrowDropDownLine className="arrow" size={"30px"} />
          </div>
        )}

        <span>
          <Link className="un" to={"/" + address + "/overview"}>
            Overview
          </Link>
        </span>
        <span>
          <Link className="un" to="/earn">
            Earn
          </Link>
        </span>
        <span>
          <Link className="un" to={"/send"}>
            Send
          </Link>
        </span>
        <span>
          <Link className="un" to="/swap">
            Swap
          </Link>
        </span>
        <span>
          <Link className="un" to="/vault">
            Vault
          </Link>
        </span>
        <div className="your-div">
          <span className="namefooter"> TESTTEST </span>
        </div>
      </div>

      <div className="main">
        <div className="container">
          <div className="center">
            <Routes>
              <Route path="/:address/overview" element={<Overview />} />
              <Route
                path="/:address/:token_id/overview"
                element={<NFTView />}
              />
              <Route path="/explore" element={<Vault />} />
              <Route path="/send" element={<Send />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/vault" element={<Vault />} />
            </Routes>
          </div>
        </div>
      </div>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span
            onClick={() =>
              (document.getElementById("myModal").style.display = "none")
            }
            className="close"
          >
            &times;
          </span>
          <p>Connect to Wallet</p>
          <ConnectionGrid />
        </div>
      </div>
    </div>
  );
}

export default App;
export const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};
