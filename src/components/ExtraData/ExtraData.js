import React from "react";
import styles from "./ExtraData.module.scss";

function ExtraData({ title, value }) {
  return (
    <div className={styles.ExtraData}>
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
}

export default ExtraData;
