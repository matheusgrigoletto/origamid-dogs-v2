import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PASSWORD_RESET } from "~/api";
import { Button } from "~components/Button";
import { Error } from "~components/Error";
import { Head } from "~components/Head";
import { Input } from "~components/Input";
import { useFetch } from "~hooks/useFetch";
import { useForm } from "~hooks/useForm";

export const PasswordReset = () => {
  const [login, setLogin] = useState("");
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const password = useForm();
  const { loading, error, request } = useFetch();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });

      const { response } = await request(url, options);
      if (response?.ok) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");

    if (key) {
      setKey(key);
    }

    if (login) {
      setLogin(login);
    }
  }, []);

  return (
    <>
      <Head title="Redefinir senha" />
      <section className="animeLeft">
        <h1 className="title">Redefinir a senha</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nova senha"
            type="password"
            name="password"
            {...password}
          />
          {loading ? (
            <Button disabled type="button">
              Enviando...
            </Button>
          ) : (
            <Button type="submit">Redefinir</Button>
          )}
        </form>
        <Error message={error} />
      </section>
    </>
  );
};
