import React from "react";
import styles from "./ConnectionGridBtn.module.scss";

export default function ConnectionGridBtn({
  title,
  type,
  clickFunction,
  className,
  children,
  image,
}) {
  return (
    <div>
      <button
        className={[
          styles.Button,
          className,
          type?.includes("secondary") && styles.secondary,
          type?.includes("small") && styles.smallBtn,
        ].join(" ")}
        onClick={clickFunction}
      >
        <span>{title || children}</span>
        <img className="Image" width="20px" height="20px" src={image} />
      </button>
    </div>
  );
}
