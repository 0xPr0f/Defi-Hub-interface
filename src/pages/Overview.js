import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/ExperimentStyles/Explore.module.scss";
import { IoCopyOutline } from "react-icons/io5";

import { useState } from "react";
import { getNFTBalance, getMetadataProps } from "./Extras";
import NFTCard from "../components/NFTAssetCard/NFTAssetCard";
import { getEllipsisTxt } from "../App";
import { AssetsTable } from "../components/AssetsTable/AssetsTable";
import { getErc20Assets } from "../CovalentAPI/CovalentAPI";
import Footer from "../components/Footer/Footer";
import Blockies from "react-blockies";
import Button from "../components/Button/Button";

export const Overview = () => {
  const { address } = useParams();
  const [activeTab, setActiveTab] = useState("token");
  const [nft, setNft] = useState([]);
  const [copyValue, setCopyValue] = useState("");
  const [acount, setAcount] = useState([]);
  const [nftImage, setNftImage] = useState([]);

  const nftload = async () => {
    if (address !== undefined && address.length >= 42) {
      const lol = await getNFTBalance(address);
      setNft(lol);
    }
  };
  const nftimage = async (url) => {
    const lol = await getMetadataProps(`${url}`);
    setNftImage(lol);
    return lol;
  };

  const accountload = async () => {
    if (address !== undefined && address.length >= 42) {
      const lol = await getErc20Assets(address, 1);
      setAcount(lol);
    }
  };
  const shortenAddress = (add) =>
    !!add
      ? (
          add.slice(0, 5) +
          "..." +
          add.slice(add.length - 4, add.length)
        ).toLowerCase()
      : "";

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyValue("Copied!");
      setTimeout(() => setCopyValue(shortenAddress(address)), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => setCopyValue(shortenAddress(address)), [address]);

  useEffect(() => {
    if (activeTab === "token") {
      accountload();
    }
  });

  return (
    <div className="Main">
      <>
        <div style={{ minHeight: "120vh" }}>
          {address.length === 42 ? (
            <>
              <div className={styles.Overview}>
                <Blockies
                  seed={"" + address + ""}
                  size={10}
                  scale={3}
                  className={styles.Blockie}
                />
                <span>{getEllipsisTxt(address)}</span>
              </div>
              <Button
                type={"small"}
                className={styles.copyButton}
                clickFunction={() => copyToClipboard(address)}
              >
                <span>{copyValue}</span>
                <IoCopyOutline />
              </Button>
              <div className={styles.ExploreTab}>
                <span
                  className={
                    activeTab === "token"
                      ? styles.ExploreTabActive
                      : styles.ExploreTabInactive
                  }
                  onClick={() => {
                    setActiveTab("token");
                  }}
                >
                  Token
                </span>
                <span
                  className={
                    activeTab === "nft"
                      ? styles.ExploreTabActive
                      : styles.ExploreTabInactive
                  }
                  onClick={() => {
                    setActiveTab("nft");
                    nftload();
                  }}
                >
                  NFTs
                </span>
                <span
                  className={
                    activeTab === "transactions"
                      ? styles.ExploreTabActive
                      : styles.ExploreTabInactive
                  }
                  onClick={() => setActiveTab("transactions")}
                >
                  Transactions
                </span>
                <div>
                  {activeTab === "transactions" ? (
                    <>
                      <div>Hello</div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {activeTab === "token" ? (
                    <>
                      <br />
                      <div>
                        <span style={{ fontSize: "40px" }}>Assets</span>
                      </div>
                      <br />

                      {acount[0] !== undefined ? (
                        <div>
                          {acount.length > 0 && acount[0].balance !== "0" ? (
                            <div>
                              <AssetsTable object={acount} />
                            </div>
                          ) : (
                            <div>
                              <span>You have no Token assets</span>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {activeTab === "nft" ? (
                    <>
                      <br />
                      <span style={{ fontSize: "40px" }}>Assets</span>
                      <br />
                      <div>
                        <br />
                        {nft.length !== 0 ? (
                          <div>
                            {nft.map((nfts, index) => (
                              <div key={index}>
                                {nftimage(nfts.token_uri).image}
                                <NFTCard
                                  key={index}
                                  image={nftImage.image}
                                  name={nfts.name}
                                  contractaddress={nfts.token_address}
                                  tokenid={nfts.token_id}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div>
                            <span>You have no NFT assets</span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div>Address is not complete</div>
          )}
        </div>
        <Footer />
      </>
    </div>
  );
};
