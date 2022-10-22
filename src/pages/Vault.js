import React, { useState } from "react";
import Footer from "../components/Footer/Footer";
import CustomBtn from "../components/CustomConnectBtn/CustomBtn";
import "./styles/Vault.scss";
import { BsPlusLg } from "react-icons/bs";
import { VaultCard } from "../components/VaultCard/VaultCard";
import Modal from "../components/Modal/Modal";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useEffect } from "react";
import { getErc20Assets } from "../CovalentAPI/CovalentAPI";
import { TokenSelectBtn } from "../components/TokenSelect/TokenSelect";
import { getEllipsisTxt } from "../App";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//wagmi contract interactions
import { erc20ABI, useAccount, useSigner } from "wagmi";
import { VaultFactoryAddress } from "../utils/Addresses";
import { ethers } from "ethers";
import { VaultFactoryABI } from "../utils/Abis";
// end of wagmi contract interactions

export const Vault = () => {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const { address, connector, isConnected } = useAccount();
  const [dateValue, setDateValue] = React.useState(
    dayjs.unix(new Date().getTime() / 1000)
  );
  const { data: signer } = useSigner();
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [epochDateValue, setEpochDateValue] = useState("");
  const [currentTokenImage, setCurrentTokenImage] = useState("");
  const [currentTokenSymbol, setCurrentTokenSymbol] = useState("Select Token");
  const [tokenAddress, setTokenAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [tokenDecimal, setTokenDecimal] = useState("");
  const [acountBalance, setAcountBalance] = useState([]);
  const [vaults, setVaults] = useState();

  useEffect(() => {
    if (show === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
  const accountload = async () => {
    if (isConnected && address !== undefined && address.length >= 42) {
      const lol = await getErc20Assets(address, 97);
      setAcountBalance(lol);
    }
  };

  useEffect(() => {
    if (isConnected && address !== undefined && address.length >= 42) {
      accountload();
    }
  });

  const createVault = async () => {
    Approve();
    const VaultContract = new ethers.Contract(
      VaultFactoryAddress,
      VaultFactoryABI,
      signer
    );
    console.log(Math.trunc(Number(epochDateValue) + 2678399).toString());
    const createVault = await VaultContract.createVault(
      amount,
      tokenAddress,
      Math.trunc(epochDateValue).toString()
    );
    console.log(createVault.wait());
  };
  useEffect(() => {
    if (!vaults) {
      vaultCreated();
    }
  });

  const vaultCreated = async () => {
    const VaultContract = new ethers.Contract(
      VaultFactoryAddress,
      VaultFactoryABI,
      signer
    );

    const vaultscreated = await VaultContract.CreatedVaults(address);
    for (var i = 0; i < vaultscreated.length; i++) {
      const vaultx = await VaultContract.vaults(vaultscreated[i]);
    }
  };

  const display = () => {
    console.log();
  };

  /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
  function showTokenModal() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    // if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
        //   }
      }
    }
  };

  const Approve = async () => {
    const ERC20Contract = new ethers.Contract(tokenAddress, erc20ABI, signer);
    const tokenAllowance = await ERC20Contract.allowance(
      address,
      VaultFactoryAddress
    );
    if (Number(tokenAllowance.toString()) < amount) {
      const tokenApprove = await ERC20Contract.approve(
        VaultFactoryAddress,
        "1000000000000000000000000000000000000000"
      );
      console.log(tokenApprove.wait());
    }
  };
  return (
    <>
      <div className="center" style={{ minHeight: "80vh" }}>
        <br />
        <br />
        <span className="textHeading">Vault</span>
        <div className="createNewWallet">
          <CustomBtn
            clickFunction={() => {
              setShow(true);
            }}
            className="btnc"
            // disabled={!write}
          >
            <div className="newvaultbtn">
              <BsPlusLg />
              <span>Create new vault</span>
            </div>
          </CustomBtn>
        </div>
        <>
          <div className="vaultcard">
            <VaultCard
              nameT={"Chainlink Token"}
              symbolT={"LINK"}
              amount={"1000"}
              address={getEllipsisTxt(
                "0x91B14AeCa1bC664Cf4a54FBD7006F9B307fdF19c"
              )}
              endtime={"01/01/2023"}
            />
            <VaultCard
              nameT={"USDC Stablecoin"}
              symbolT={"USDC"}
              amount={"10000"}
              address={getEllipsisTxt(
                "0x4a54FBD791B14AbC664C0dF19cfCa19B06Fe7f30"
              )}
              endtime={"05/03/2023"}
            />
            <VaultCard
              nameT={"DAI Stablecoin"}
              symbolT={"DAI"}
              amount={"10000"}
              address={getEllipsisTxt(
                "0xD7006F9B3019Ca191B14Aea54cbC664Cf47fdFFB"
              )}
              endtime={"21/01/2023"}
            />

            <Modal
              title={"Create vault"}
              show={show}
              size="small"
              onClose={() => setShow(false)}
              backCLoseFunction={() => setShow(false)}
            >
              <div className="cdropdownAdjustsend cflexout">
                <div className="dropdown">
                  <button onClick={showTokenModal} className="dropbtn">
                    <span className="currenttokenTest">
                      {tokenAddress ? (
                        <>
                          {null}
                          {/*} <img
                          width="30px"
                          height="30px"
                          src={currentTokenImage}
                      /> */}
                        </>
                      ) : null}
                      <span>
                        {currentTokenSymbol.length > 10 &&
                        currentTokenSymbol !== "Select Token"
                          ? getEllipsisTxt(currentTokenSymbol, 4)
                          : currentTokenSymbol}
                      </span>
                      <KeyboardArrowDownIcon />
                    </span>
                  </button>
                  <div id="myDropdown" className="dropdown-content">
                    {acountBalance.map((bal, index) => (
                      <span
                        className="spanRenderTokens"
                        onClick={() => {
                          setShowSecondModal(false);
                          setCurrentTokenImage(bal.logo_url);
                          setTokenAddress(bal.contract_address);
                          setCurrentTokenSymbol(bal.contract_ticker_symbol);
                          setTokenDecimal(bal.contract_decimals);
                          showTokenModal();
                          console.log(currentTokenSymbol);
                        }}
                        key={index}
                      >
                        {" "}
                        {bal.contract_ticker_symbol.length > 10
                          ? getEllipsisTxt(bal.contract_ticker_symbol, 5)
                          : bal.contract_ticker_symbol}
                      </span>
                    ))}
                  </div>
                </div>
                <input
                  placeholder="0.0"
                  className="cinputFieldsend ctokenvalue"
                  spellCheck="false"
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    const re = /^\d*(\.)?(\d{0,10})?$/;
                    if (e.target.value === "" || re.test(e.target.value)) {
                      setAmount(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="inputStack">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      // className="datepicker"
                      label="Lock end date"
                      value={dateValue}
                      minDate={dayjs("2015-05-11")}
                      onChange={(newValue) => {
                        setDateValue(newValue);
                        setEpochDateValue(
                          new Date(dateValue).getTime() / 1000.0
                        );
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              <div>
                <CustomBtn
                  clickFunction={() => {
                    createVault();
                  }}
                  className="btnc"
                >
                  <div className="newvaultbtn">
                    <BsPlusLg />
                    <span>Create Vault</span>
                  </div>
                </CustomBtn>
              </div>
            </Modal>
          </div>
        </>
      </div>

      <div>
        <Footer />
      </div>
      <Modal
        title={"Select a Token"}
        show={show}
        onClose={() => setShowSecondModal(false)}
        backCLoseFunction={() => setShowSecondModal(false)}
        size="small"
      ></Modal>
    </>
  );
};
