import { useContext, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./UserHeaderNav.module.css";
import { ReactComponent as MinhasFotosSVG } from "~/assets/feed.svg";
import { ReactComponent as EstatisticasSVG } from "~/assets/estatisticas.svg";
import { ReactComponent as AdicionarFotoSVG } from "~/assets/adicionar.svg";
import { ReactComponent as SairSVG } from "~/assets/sair.svg";
import { UserContext } from "~/UserContext";
import { useMedia } from "~/hooks/useMedia";

export const UserHeaderNav = () => {
  const { userLogout } = useContext(UserContext);
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta" end>
          <MinhasFotosSVG />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <EstatisticasSVG />
          {mobile && "Estatísticas"}
        </NavLink>
        <NavLink to="/conta/postar">
          <AdicionarFotoSVG />
          {mobile && "Adicionar Foto"}
        </NavLink>
        <button onClick={userLogout}>
          <SairSVG />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};
