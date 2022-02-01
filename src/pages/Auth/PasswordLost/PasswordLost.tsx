import { FormEvent } from "react";

import { PASSWORD_LOST } from "~/api";
import { Button } from "~components/Button";
import { Error } from "~components/Error";
import { Head } from "~components/Head";
import { Input } from "~components/Input";
import { useFetch } from "~hooks/useFetch";
import { useForm } from "~hooks/useForm";

const RETURN_URL = "http://localhost:3000/login/resetar";

export const PasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { url, options } = PASSWORD_LOST({
      login: login.value,
      url: RETURN_URL,
    });

    await request(url, options);
  };

  return (
    <>
      <Head title="Perdeu a senha?" />
      <section className="animeLeft">
        <h1 className="title">Perdeu a senha?</h1>
        {data ? (
          <p style={{ color: "#37a80e" }}>{data}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              label="E-mail / Usuário"
              type="text"
              name="email"
              {...login}
            />
            {loading ? (
              <Button disabled type="button">
                Enviando...
              </Button>
            ) : (
              <Button type="submit">Enviar e-mail</Button>
            )}
          </form>
        )}
        <Error message={error} />
      </section>
    </>
  );
};
