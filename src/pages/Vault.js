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

//wagmi contract interactions
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";
import { createVaultAbi, vaultCreatedAbi } from "../utils/Abis";
import { VaultFactoryAddress } from "../utils/Addresses";
import { binanceSmartChain } from "..";
// end of wagmi contract interactions

export const Vault = () => {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState("");
  const [dateValue, setDateValue] = React.useState(
    dayjs.unix(new Date().getTime() / 1000)
  );
  const [epochDateValue, setEpochDateValue] = useState("");
  /*
  const { config, error } = usePrepareContractWrite({
    address: VaultFactoryAddress,
    abi: createVaultAbi,
    functionName: "createVault",
    args: [69], //Arguments to pass to function call.
    chainId: binanceSmartChain.id,
  });

  const { data, isError, isLoading } = useContractRead({
    address: VaultFactoryAddress,
    abi: vaultCreatedAbi,
    functionName: "CreatedVaults",
    args: ["0xA0Cf798816D4b9b9866b5330EEa46a18382f251e"],
  });
*/
  //  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <>
      <div className="center" style={{ minHeight: "120vh" }}>
        <br />
        <br />
        <span className="textHeading">Vault</span>
        <div className="createNewWallet">
          <CustomBtn
            clickFunction={() => {
              setShow(true);
              // write?.();
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
            <VaultCard />
            <VaultCard />
            <VaultCard />
            <VaultCard />
            <VaultCard />
            <VaultCard />
            <VaultCard />
            <VaultCard />
            <VaultCard />
            <VaultCard />
            <VaultCard />
            <VaultCard />
            <Modal
              title={"Create vault"}
              show={show}
              onClose={() => setShow(false)}
              backCLoseFunction={() => setShow(false)}
            >
              <div className="cdropdownAdjustsend cflexout">
                <span>PHLDV</span>
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
                    //   console.log(epochDateValue.getTime() / 1000.0);
                    var myDate = new Date(dateValue);
                    var myEpoch = myDate.getTime() / 1000.0;
                    console.log(myEpoch);
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
    </>
  );
};
