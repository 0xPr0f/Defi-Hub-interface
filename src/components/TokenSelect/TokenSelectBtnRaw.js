import styles from "./TokenSelectBtn.module.scss";

export default function TokenSelectBtnRaw({
  title,
  type,
  className,
  children,
  clickFunction,
  disabled,
}) {
  return (
    <button
      disabled={disabled}
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
