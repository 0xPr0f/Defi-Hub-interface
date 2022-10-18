import styles from "./NFTAssetCard.module.scss";

export default function NFTCard({ image, name, contractaddress, tokenid }) {
  return (
    <div className={styles.NFTCard}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className={styles.pricingInfo}>
        <div>
          <span>Contract Address : </span>
          <span>{contractaddress}</span>
        </div>
        <br />
        <div>
          <span>Token ID : </span>
          <span>#{tokenid}</span>
        </div>
      </div>
    </div>
  );
}
