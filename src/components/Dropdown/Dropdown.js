import React, { useEffect } from "react";
import { useState } from "react";
import { MenuItem } from "@mui/material";
import styles from "../../pages/styles/ExperimentStyles/Explore.module.scss";
import Options from "../Options/Options";
import "./Dropdown.module.scss";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { GrFormCheckmark } from "react-icons/gr";
import { IoChevronDownOutline } from "react-icons/io5";
import CustomBtn from "../CustomConnectBtn/CustomBtn";

export const Dropdown = ({ className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterValues] = useState({
    GLTV1: "GLTV1",
    GLTV2: "GLTV2",
  });

  let navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { search } = useLocation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    navigate(
      `/bridge?token=${
        filterType ? filterType : queryParams.get("token")
      }&sourceNetwork=BSCTN&destNetwork=POLYTN`
    );
  }, []);
  useEffect(() => {
    const queryParams = new URLSearchParams(search);

    if (queryParams.get("token") !== "null") {
      setFilterType(queryParams.get("token"));
    } else {
      setFilterType("GLTV1");
      navigate(
        `/bridge?token=${filterType}&sourceNetwork=BSCTN&destNetwork=POLYTN`
      );
    }
  }, []);
  return (
    <div>
      <div className={styles.MenuOptions}>
        <div
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <CustomBtn className={"dropdown" + className + ""}>
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
                const queryParams = new URLSearchParams(search);
                navigate(
                  `/bridge?token=${value}&sourceNetwork=BSCTN&destNetwork=POLYTN`
                );
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

export const FromDropdown = ({ className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterType, setFilterType] = useState("BSCTN");
  const [filterValues] = useState({
    BSCTN: "BSC TN",
  });

  let navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { search } = useLocation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    navigate(
      `/bridge?token=${queryParams.get(
        "token"
      )}&sourceNetwork=BSCTN&destNetwork=POLYTN`
    );
  }, []);
  return (
    <div>
      <div className={styles.MenuOptions}>
        <div
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <CustomBtn className={"dropdown" + className + ""}>
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
                const queryParams = new URLSearchParams(search);
                navigate(
                  `/bridge?token=${queryParams.get(
                    "token"
                  )}&sourceNetwork=BSCTN&destNetwork=POLYTN`
                );
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

export const ToDropdown = ({ className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterType, setFilterType] = useState("POLYTN");
  const [filterValues] = useState({
    POLYTN: "POLY TN",
  });

  let navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { search } = useLocation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    navigate(
      `/bridge?token=${queryParams.get(
        "token"
      )}&sourceNetwork=BSCTN&destNetwork=POLYTN`
    );
  }, []);
  return (
    <div>
      <div className={styles.MenuOptions}>
        <div
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <CustomBtn className={"dropdown" + className + ""}>
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
                const queryParams = new URLSearchParams(search);
                navigate(
                  `/bridge?token=${queryParams.get(
                    "token"
                  )}&sourceNetwork=BSCTN&destNetwork=POLYTN`
                );
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
