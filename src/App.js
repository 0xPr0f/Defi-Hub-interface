import "./App.css";
import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Overview } from "./pages/Overview";
import { Send } from "./pages/Send";
import { Swap } from "./pages/Swap";
import { Vault } from "./pages/Vault";
import { NFTView } from "./pages/NFTView";
import { Bridge } from "./pages/Bridge";
import { Earn } from "./pages/Earn";
import VaultView from "./pages/VaultView";
import { Faucet } from "./pages/Faucet";
import Home from "./pages/Home";

function App() {
  // const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  // const { data: ensName } = useEnsName({ address });
  const { address, connector, isConnected } = useAccount();

  return (
    <div className="App">
      <div className="sidenav">
        <br />
        <div className="buttonAddress">
          <ConnectButton
            showBalance={false}
            chainStatus={{ smallScreen: "icon", largeScreen: "icon" }}
            accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
          />
        </div>

        <br />
        <span>
          <Link
            className="un"
            to={isConnected ? "/" + address + "/overview" : null}
          >
            Overview
          </Link>
        </span>
        <span>
          <Link className="un" to={isConnected ? "/earn" : null}>
            Earn
          </Link>
        </span>
        <span>
          <Link className="un" to={isConnected ? "/send" : null}>
            Send
          </Link>
        </span>
        <span>
          <Link className="un" to={isConnected ? "/swap" : null}>
            Swap
          </Link>
        </span>
        <span>
          <Link className="un" to={isConnected ? "/vault" : null}>
            Vault
          </Link>
        </span>
        <span>
          <Link className="un" to={isConnected ? "/bridge" : null}>
            Bridge
          </Link>
        </span>
        <span>
          <Link className="un" to={isConnected ? "/faucet" : null}>
            Faucet
          </Link>
        </span>
        <br />
        <br />
        <br />
        <div className="your-div">
          <span className="namefooter"> DEFI HUB</span>
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
              <Route path="/vault/:vault_address" element={<VaultView />} />
              <Route path="/earn" element={<Earn />} />
              <Route path="/send" element={<Send />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/vault" element={<Vault />} />
              <Route path="/bridge" element={<Bridge />} />
              <Route path="/" exact element={<Home />} />
              <Route path="/faucet" element={<Faucet />} />
            </Routes>
          </div>
        </div>
      </div>
      {/*}
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span
            onClick={() =>
              (document.getElementById("myModal").style.display = "none")
            }
            className="close"
          >
            <FaTimes />
          </span>

          <p className="textconnect">Connect to Wallet</p>
          <span className="pls">
            please connect your wallet before proceeding
          </span>
          <ConnectionGrid />
        </div>
      </div>
          */}
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
