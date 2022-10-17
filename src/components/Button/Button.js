import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

export default function Button({
  title,
  type,
  linkRoute,
  className,
  children,
  clickFunction,
}) {
  if (type && type.includes("link")) {
    return (
      <Link href={linkRoute}>
        <span
          className={[
            styles.Link,
            className,
            type?.includes("secondary") && styles.secondary,
            type?.includes("small") && styles.smallBtn,
          ].join(" ")}
        >
          {title}
        </span>
      </Link>
    );
  } else {
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
}
