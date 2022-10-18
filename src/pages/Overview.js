import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/ExperimentStyles/Explore.module.scss";
import { useState } from "react";
import { getNFTBalance, getMetadataProps } from "./Moralis";
import NFTCard from "../components/NFTAssetCard/NFTAssetCard";
import { getEllipsisTxt } from "../App";
import { AssetsTable } from "../components/AssetsTable/AssetsTable";
import { getErc20Assets } from "../CovalentAPI/CovalentAPI";

export const Overview = () => {
  const { address } = useParams();
  const [activeTab, setActiveTab] = useState("token");
  const [nft, setNft] = useState([]);
  const [acount, setAcount] = useState([]);
  const [nftImage, setNftImage] = useState([]);

  const nftload = async () => {
    const lol = await getNFTBalance(
      "0x4c6Ec2448C243B39Cd1e9E6db0F9bF7436c0c93f"
    );
    setNft(lol);
  };
  const nftimage = async (url) => {
    const lol = await getMetadataProps(`${url}`);
    setNftImage(lol);
    return lol;
  };

  const accountload = async () => {
    const lol = await getErc20Assets(
      "0x4c6Ec2448C243B39Cd1e9E6db0F9bF7436c0c93f",
      1
    );
    console.log(lol);
    setAcount(lol);
  };
  useEffect(() => {
    if (activeTab === "token") {
      accountload();
    }
  });
  return (
    <>
      <div>
        {address.length === 42 ? (
          <>
            <div> overview {address}</div>
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
                    <div>
                      <AssetsTable object={acount} />
                      {console.log(acount)}
                    </div>
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
                      <div>
                        {nft.map((nfts, index) => (
                          <div key={index}>
                            {nftimage(nfts.token_uri).image}
                            <NFTCard
                              key={index}
                              image={nftImage.image}
                              name={nfts.name}
                              contractaddress={getEllipsisTxt(
                                nfts.token_address,
                                11
                              )}
                              tokenid={
                                nfts.token_id < 7
                                  ? nfts.token_id
                                  : getEllipsisTxt(nfts.token_id, 10)
                              }
                            />
                          </div>
                        ))}
                      </div>
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
    </>
  );
};
