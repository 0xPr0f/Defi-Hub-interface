import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";

const Home = () => {
  return (
    <div>
      <div>
        <h1>Welcome to the HUB of BNB</h1>
      </div>
      <span>Explore, swap, earn and bridge</span>
      <br />
      <br />
      <br />
      <div>
        <ConnectButton
          showBalance={false}
          chainStatus={{ smallScreen: "icon", largeScreen: "icon" }}
          accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
        />
      </div>
    </div>
  );
};

export default Home;
