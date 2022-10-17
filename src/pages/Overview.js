import React from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/ExperimentStyles/Explore.module.scss";

export const Overview = () => {
  const { address } = useParams();
  return (
    <>
      <div>
        {address.length === 42 ? (
          <>
            <div> overview {address}</div>
            <div className={styles.ExploreTab}>
              <span
                className={
                  activeTab === "nft"
                    ? styles.ExploreTabActive
                    : styles.ExploreTabInactive
                }
                onClick={() => setActiveTab("nft")}
              >
                NFTs
              </span>
              <span
                className={
                  activeTab === "activities"
                    ? styles.ExploreTabActive
                    : styles.ExploreTabInactive
                }
                onClick={() => setActiveTab("activities")}
              >
                Activities
              </span>
            </div>
          </>
        ) : (
          <div>Address is not complete</div>
        )}
      </div>
    </>
  );
};
