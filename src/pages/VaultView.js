import React from "react";
import styles from "./styles/NFTview.scss";
import { useParams } from "react-router-dom";

const VaultView = () => {
  const { vault_address } = useParams();
  return <div>VaultView</div>;
};

export default VaultView;
