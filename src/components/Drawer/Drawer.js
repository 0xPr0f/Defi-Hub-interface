import React from "react";
import styles from "./Drawer.module.scss";

import ethLogo from "./../../Assets/Icons/ether.png";
import dropper from "./../../Assets/Icons/dropper.svg";

function Drawer({ status, value, balance, token, valueHandler }) {
  return (
    <div className={styles.Drawer}>
      <div className={styles.DrawerInfo}>
        <span>{status}</span>
        <span>Balance: {balance}</span>
      </div>
      <div className={styles.DrawerForm}>
        <div className={styles.DrawerFormInput}>
          <input
            placeholder="0.00"
            onChange={valueHandler}
            value={!!value ? value : ""}
            disabled={status.toLowerCase() === "to"}
          />
          <div className={styles.DrawerFormDropper}>
            {token?.address ? (
              <div className={styles.availableToken}>
                <img src={token.logoURI} alt={token.name} />
                <span>{token.symbol}</span>
              </div>
            ) : (
              <div>
                <span>Select a token</span>
              </div>
            )}
            <img src={dropper} alt="Dropper" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
