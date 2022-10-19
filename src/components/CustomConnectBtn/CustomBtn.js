import { Link } from "react-router-dom";
import styles from "./CustomBtn.module.scss";

export default function CustomBtn({
  title,
  type,
  className,
  children,
  clickFunction,
}) {
  return (
    <button
      className={[
        styles.Button,
        className,
        type?.includes("secondary") && styles.secondary,
        type?.includes("small") && styles.smallBtn,
      ].join(" ")}
      onClick={clickFunction}
    >
      {title || children}
    </button>
  );
}
