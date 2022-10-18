import styles from "./NFTAssetCard.module.scss";
import { useNavigate } from "react-router-dom";
import { getEllipsisTxt } from "../../App";

export default function NFTCard({ image, name, contractaddress, tokenid }) {
  let navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/${contractaddress}/${tokenid}/overview`)}
      className={styles.NFTCard}
    >
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className={styles.pricingInfo}>
        <div>
          <span>Contract Address : </span>
          <span>{getEllipsisTxt(contractaddress, 11)}</span>
        </div>
        <br />
        <div>
          <span>Token ID : </span>
          <span>#{getEllipsisTxt(tokenid, 10)}</span>
        </div>
      </div>
    </div>
  );
}
