import React, { useState } from "react";

import Footer from "../components/Footer/Footer";
import VaultView from "./VaultView";

export const Swap = () => {
  return (
    <>
      <div>Swap</div>
      <div style={{ minHeight: "80vh" }}>
        <VaultView />
      </div>
      <Footer />
    </>
  );
};
