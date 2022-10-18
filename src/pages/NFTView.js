import React, { useEffect } from "react";
import { NFTDetailsView } from "../components/NFTDetailsView/NFTDetailsView";
import { getNFTMetadataBalance } from "./Extras";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getMetadataProps } from "./Extras";
import styles from "./styles/NFTview.scss";
import Footer from "../components/Footer/Footer";

export const NFTView = () => {
  const { address, token_id } = useParams();
  const [nft, setNft] = useState([]);
  const [nftImage, setNftImage] = useState([]);

  const nftload = async () => {
    if (address !== undefined && address.length >= 42) {
      const lol = await getNFTMetadataBalance(address, token_id);
      setNft(lol);
    }
  };

  const nftimage = async (url) => {
    const lol = await getMetadataProps(`${url}`);
    setNftImage(lol);
  };

  useEffect(() => {
    nftload();
  }, []);

  useEffect(() => {
    if (nft.token_uri && !nftImage.description) {
      nftimage(nft.token_uri);
      console.log(nft.token_uri);
    }
  });

  return (
    <>
      <div style={{ minHeight: "120vh" }} className="NFTview">
        {address !== undefined && address.length >= 42 ? (
          <div>
            <NFTDetailsView
              Name={nft.name}
              Tokenid={nft.token_id}
              Description={nftImage.description}
              Image={nftImage.image}
              OwnerAddress={nft.owner_of}
              TokenAddress={nft.token_address}
              contractType={nft.contract_type}
            />
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
};
