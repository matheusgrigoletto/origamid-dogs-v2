import { useContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import styles from "./Auth.module.css";

import { UserContext } from "~/UserContext";
import { Login } from "~pages/Auth/Login";
import { Signup } from "~pages/Auth/Signup";
import { PasswordLost } from "~pages/Auth/PasswordLost";
import { PasswordReset } from "~pages/Auth/PasswordReset";
import { NotFound } from "~pages/NotFound";

export const Auth = () => {
  const { login } = useContext(UserContext);

  if (login === true) {
    return <Navigate to="/" />;
  }

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="criar" element={<Signup />} />
          <Route path="perdeu" element={<PasswordLost />} />
          <Route path="resetar" element={<PasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};
