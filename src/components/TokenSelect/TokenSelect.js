import React from "react";
import styles from "./TokenSelectBtn.module.scss";
import TokenSelectBtnRaw from "./TokenSelectBtnRaw";

export const TokenSelectBtn = ({
  name,
  symbol,
  image,
  balance,
  clickFunction,
}) => {
  return (
    <div>
      <TokenSelectBtnRaw
        clickFunction={clickFunction}
        className={styles.tokenselectbtnraw}
      >
        <div className={styles.componentDiv}>
          <div>
            <img
              onLoadedData={(e) => {
                console.log(e);
              }}
              className={styles.componentDivImage}
              width="40px"
              height="35px"
              src={image}
            />
          </div>
          <div className={styles.FixMarginalWidth}>
            <div className={styles.tokenInlayout}>
              <span className={styles.tokenInlayoutTokenSymbol}>{symbol}</span>
              <br />
              <span className={styles.tokenInlayoutTokenName}>{name}</span>
            </div>
            <div className={styles.tokenInlayoutTokenBalance}>
              <span>{balance} </span>
            </div>
          </div>
        </div>
      </TokenSelectBtnRaw>
    </div>
  );
};
