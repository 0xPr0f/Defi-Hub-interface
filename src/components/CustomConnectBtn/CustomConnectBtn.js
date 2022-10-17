import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Blockies from "react-blockies";
import MenuItem from "@mui/material/MenuItem";

import Button from "../Button/Button";
import styles from "./CustomConnectBtn.module.scss";
import Options from "../Options/Options";

export default function CustomConnectBtn() {
  const push = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const shortenAddress = (add) =>
    !!add
      ? (
          add.slice(0, 5) +
          "..." +
          add.slice(add.length - 4, add.length)
        ).toLowerCase()
      : "";

  return <div></div>;
}
