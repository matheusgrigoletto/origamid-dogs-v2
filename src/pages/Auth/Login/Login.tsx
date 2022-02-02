import { useContext, FormEvent } from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";
import stylesBtn from "~/components/Button/Button.module.css";

import { UserContext } from "~/UserContext";
import { useForm } from "~/hooks/useForm";
import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import { Error } from "~components/Error";
import { Head } from "~components/Head";

export const Login = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = useContext(UserContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <>
      <Head title="Login" />
      <section className="slideIn">
        <h1 className="title">Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input label="Usuário" type="text" name="username" {...username} />
          <Input label="Senha" type="password" name="password" {...password} />
          {loading ? (
            <Button type="button" disabled>
              Carregando...
            </Button>
          ) : (
            <Button type="submit">Entrar</Button>
          )}
          <Error message={error && "Dados incorretos"} />
        </form>
        <Link className={styles.perdeu} to="/login/perdeu">
          Perdeu a Senha?
        </Link>
        <div className={styles.cadastro}>
          <h2 className={styles.subtitle}>Cadastre-se</h2>
          <p>Ainda não possui conta? Cadastre-se no site.</p>
          <Link className={stylesBtn.button} to="/login/criar">
            Cadastro
          </Link>
        </div>
      </section>
    </>
  );
};
