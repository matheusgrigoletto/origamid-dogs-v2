import { FormEvent } from "react";

import { PASSWORD_LOST } from "~/api";
import { useFetch } from "~hooks/useFetch";
import { useForm } from "~hooks/useForm";
import { Button } from "~components/Button";
import { Error } from "~components/Error";
import { Head } from "~components/Head";
import { Input } from "~components/Input";

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
      <section className="slideIn">
        <h1 className="title">Perdeu a senha?</h1>
        {data ? (
          <p className="success">{data}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              label="E-mail / Usuário"
              type="text"
              name="email"
              {...login}
            />
            {loading ? (
              <Button type="button" disabled>
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
