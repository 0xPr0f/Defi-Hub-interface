import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "@rainbow-me/rainbowkit/styles.css";
import {
  Chain,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export const binanceSmartChain = {
  id: 97,
  name: "Binance Smart Chain Testnet",
  network: "Binance Smart Chain Testnet",
  iconUrl:
    "https://gateway.pinata.cloud/ipfs/QmfFWYYi1HECxne3wTpvHKsek9aNDbPzDNxNAfiNmhPTxv",
  iconBackground: "#000000",
  nativeCurrency: {
    decimals: 18,
    name: "Binance",
    symbol: "tBNB",
  },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://testnet.bscscan.com" },
    etherscan: { name: "BscScan", url: "https://testnet.bscscan.com" },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [binanceSmartChain],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })],
  [
    alchemyProvider({ apiKey: "2CjGw9Qa34v-UXMLq_aFG1AkD9monu47" }),
    publicProvider(),
  ]
);

/*
const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
*/
const { connectors } = getDefaultWallets({
  appName: "Defi Hub",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

//    {/*    chains={configureChains} */}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        showRecentTransactions={true}
        modalSize="compact"
        theme={darkTheme()}
        chains={chains}
      >
        <Router>
          <App />
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
