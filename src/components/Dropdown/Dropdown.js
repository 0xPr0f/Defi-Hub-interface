import React from "react";
import { useState } from "react";
import { MenuItem } from "@mui/material";
import styles from "../../pages/styles/ExperimentStyles/Explore.module.scss";
import Options from "../Options/Options";
import "./Dropdown.module.scss";

import { GrFormCheckmark } from "react-icons/gr";
import { IoChevronDownOutline } from "react-icons/io5";
import CustomBtn from "../CustomConnectBtn/CustomBtn";

export const Dropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterType, setFilterType] = useState("rl");
  const open = Boolean(anchorEl);
  const [filterValues] = useState({
    rl: "USDC",
    plh: "HOP",
    phl: "ETH",
    rhl: "MATIC",
    rlh: "USDT",
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className={styles.MenuOptions}>
        <div
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <CustomBtn className="dropdown">
            <span>{filterValues[filterType]}</span>
            <IoChevronDownOutline />
          </CustomBtn>
        </div>
        <Options anchorEl={anchorEl} handleClose={handleClose}>
          {Object.keys(filterValues).map((value) => (
            <MenuItem
              key={value}
              className={styles.Menu}
              onClick={() => {
                setFilterType(value);
                console.log(value);
                return handleClose();
              }}
            >
              <span>{filterValues[value]}</span>
              {filterType === value && (
                <GrFormCheckmark size={25} fill="rgb(8, 8, 154)" />
              )}
            </MenuItem>
          ))}
        </Options>
      </div>
    </div>
  );
};
