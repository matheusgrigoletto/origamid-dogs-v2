import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./UserPhotoPost.module.css";

import { PHOTO_POST } from "~/api";
import { useForm } from "~/hooks/useForm";
import { useFetch } from "~/hooks/useFetch";
import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import { Error } from "~/components/Error";

export const UserPhotoPost = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState<{ raw: any; preview: string }>({
    raw: "",
    preview: "",
  });
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    if (data) {
      navigate("/conta");
    }
  }, [data, navigate]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token!);
    request(url, options);
  };

  const handleImgChange = ({ target }: { target: any }) => {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  };

  return (
    <section className={`${styles.photoPost} slideIn`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button type="button" disabled>
            Enviando...
          </Button>
        ) : (
          <Button type="submit">Enviar</Button>
        )}
        <Error message={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};
