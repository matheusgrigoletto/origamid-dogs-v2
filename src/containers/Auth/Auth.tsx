import { useContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import styles from "./Auth.module.css";
import { UserContext } from "~/UserContext";
import { Login } from "~pages/Auth/Login/Login";
import { Signup } from "~pages/Auth/Signup/Signup";
import { PasswordLost } from "~pages/Auth/PasswordLost/PasswordLost";
import { PasswordReset } from "~pages/Auth/PasswordReset/PasswordReset";

export const Auth = () => {
  const { login } = useContext(UserContext);

  if (login === true) {
    return <Navigate to="/conta" />;
  }

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="criar" element={<Signup />} />
          <Route path="perdeu" element={<PasswordLost />} />
          <Route path="resetar" element={<PasswordReset />} />
        </Routes>
      </div>
    </section>
  );
};