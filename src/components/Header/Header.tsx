import { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

import { ReactComponent as DogsSVG } from "~assets/dogs.svg";
import { UserContext } from "~/UserContext";

export const Header = () => {
  const { data } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogos - Home">
          <DogsSVG />
        </Link>
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};
