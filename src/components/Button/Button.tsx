import { PropsWithChildren } from "react";

import styles from "./Button.module.css";

export const Button = ({ children, ...props }: PropsWithChildren<any>) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};
