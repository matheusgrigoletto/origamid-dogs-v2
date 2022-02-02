import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import styles from "./UserHeader.module.css";

import { UserHeaderNav } from "~/components/UserHeaderNav";

export const UserHeader = () => {
  const [title, setTitle] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case "/conta/postar":
        setTitle("Poste sua foto");
        break;
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      default:
        setTitle("Minha conta");
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};
