import React, { useState } from "react";

import styles from "./styles/ExperimentStyles/Swap.module.scss";
import Drawer from "../components/Drawer/Drawer";
import ExtraData from "../components/ExtraData/ExtraData";
import SettingsIcon from "../Assets/Icons/setting.svg";

export const Swap = () => {
  const [toToken, setToToken] = useState();
  const [fromToken, setFromToken] = useState({});
  const [toTokenValue, setToTokenValue] = useState(0);
  const [fromTokenValue, setFromTokenValue] = useState(0);
  const [chain, setChain] = useState("bsc");

  const fromTokenValueHandler = (e) => {
    setFromTokenValue(e.target.value);
  };

  return (
    <>
      <div>Swap</div>
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <div className={styles.SwapComponent}>
            <div className={styles.SwapComponentHeader}>
              <span>Swap</span>
              <img src={SettingsIcon} alt="settings" />
            </div>
            <Drawer
              status={"From"}
              balance={0}
              value={fromTokenValue}
              valueHandler={fromTokenValueHandler}
              token={fromToken}
            />
            <Drawer
              status={"To"}
              balance={0}
              value={toTokenValue}
              valueHandler={fromTokenValueHandler}
              token={toToken}
            />
            <ExtraData title="Exchange Rate" value={"-"} />
            <div className={styles.hr}></div>
            <ExtraData title="Expected slippage" value={"-"} />
            <ExtraData title="Minimum received" value={"-"} />
            <ExtraData title="Swap Fee" value={"1%"} />
            <button>Swap</button>
          </div>
        </header>
      </div>
    </>
  );
};
