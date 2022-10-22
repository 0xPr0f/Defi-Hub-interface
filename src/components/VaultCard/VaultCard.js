import React from "react";
import { getEllipsisTxt } from "../../App";
import styles from "./VaultCard.module.scss";

export const VaultCard = ({ nameT, address, amount, symbolT, endtime }) => {
  return (
    <div className={styles.Head}>
      <div className={styles.Table}>
        <table>
          <thead>
            <tr className={styles.TR}>
              <th>Token Name</th>
              <th>Vault Address</th>
              <th>Balance</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className={[styles.TR, "trl"]}>
              {/*}   {tableObject.quote_rate > "0" && tableObject.balance > "0" ? ( */}
              <>
                <td className={styles.AccountBlock}>
                  {/*} <img
                    width={"40px"}
                    height={"40px"}
                    src={
                      "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x616972a19d07ebedba325ea87878e61d01695f57cee46dc9ae594977efd34c0d/image"
                    }
                    alt={"#"}
                  /> */}
                  <span>{nameT}</span>
                </td>
                <td>{address}</td>
                <td>
                  {amount}
                  <span>
                    &nbsp;
                    {symbolT}
                  </span>
                </td>
                <td> {endtime}</td>
              </>
              {/*}  ) : (
                    <></>
                )} */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
