import { ChangeEvent, FormEvent, useState } from "react";

import styles from "./PhotoCommentsForm.module.css";
import { ReactComponent as EnviarSVG } from "~assets/enviar.svg";
import { COMMENT_POST } from "~/api";
import type { Comment } from "~/types/Comment";
import { useFetch } from "~hooks/useFetch";
import { Error } from "~components/Error/Error";

type PhotoCommentsFormProps = {
  id: number;
  setComments: any;
};

export const PhotoCommentsForm = ({
  id,
  setComments,
}: PhotoCommentsFormProps) => {
  const [comment, setComment] = useState("");
  const { request, error } = useFetch();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token")!;
    const { url, options } = COMMENT_POST(id, { comment }, token);
    const { response, json } = await request(url, options);

    if (response?.ok) {
      setComment("");
      setComments((comments: Comment[]) => [...comments, json]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        id="comment"
        name="comment"
        placeholder="Comente"
        value={comment}
        onChange={handleChange}
      />
      <button type="submit">
        <EnviarSVG />
      </button>
      <Error message={error} />
    </form>
  );
};
