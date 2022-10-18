import React from "react";
import styles from "./NFTDetailsView.module.scss";
import Blockies from "react-blockies";
import { getEllipsisTxt } from "../../App";
import Footer from "../Footer/Footer";
import { BiShow } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import { SiBinance } from "react-icons/si";
import { loadExternalURL } from "../../pages/Extras";

export const NFTDetailsView = ({
  Name,
  Tokenid,
  Description,
  Image,
  OwnerAddress,
  TokenAddress,
  contractType,
}) => {
  return (
    <div>
      <div className={styles.Placeholder}>
        <div>
          <img
            className={styles.img}
            width="500px"
            height="500px"
            src={Image}
            alt="_blank"
          />
        </div>
        <div>
          <div className={styles.propsDetails}>
            <span className={styles.name}>{Name}</span>
            <br />
            <span className={styles.name_tokenid}>
              {Name} #
              {Tokenid && Tokenid.length > 5
                ? getEllipsisTxt(Tokenid)
                : Tokenid}
            </span>
            <br />
            <span className={styles.description}>{Description}</span>
            <br />
            <br />
            <div className={styles.Fix}>
              <Blockies
                seed={"" + OwnerAddress + ""}
                size={10}
                scale={3}
                className={styles.Blockie}
              />

              <div className={styles.ownerheading}>
                <span className={styles.textOwner}>Current owner </span>
                <span className={styles.text}>
                  {getEllipsisTxt(`${OwnerAddress}`)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className={styles.traits}>Traits</div>
      <br />
      <div className={styles.traits}>
        Details
        <div className={styles.ownerheadingDetails}>
          <br />
          <div className={styles.AddIcons}>
            <BiShow />
            <span
              onClick={() =>
                loadExternalURL(
                  `https://testnet.bscscan.com/token/${TokenAddress}`
                )
              }
              className={styles.traitsextra}
            >
              View on BSC Testnet scan
            </span>
          </div>
          <div className={styles.AddIcons}>
            <MdOpenInNew />
            <span
              onClick={() => loadExternalURL(Image)}
              className={styles.traitsextra}
            >
              Open original on IPFS
            </span>
          </div>
          <div className={styles.AddIcons}>
            <SiBinance />
            <span className={styles.traitsextra}>
              Binance Smart Chain - {contractType}
            </span>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};
