import styles from "./Footer.module.css";

import { ReactComponent as DogsSVG } from "~assets/dogs-footer.svg";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <DogsSVG />
      <p>Dogos. Alguns direitos reservados.</p>
    </footer>
  );
};
