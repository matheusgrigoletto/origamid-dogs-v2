import styles from "./PhotoDeleteButton.module.css";
import { useFetch } from "~hooks/useFetch";
import { PHOTO_DELETE } from "~/api";

type PhotoDeleteButtonProps = {
  id: number;
};

export const PhotoDeleteButton = ({ id }: PhotoDeleteButtonProps) => {
  const { loading, request } = useFetch();

  const handleClick = async () => {
    const confirm = window.confirm("Deseja realmente apagar?");

    if (!confirm) {
      return;
    }

    const token = window.localStorage.getItem("token")!;
    const { url, options } = PHOTO_DELETE(id, token);
    const { response } = await request(url, options);

    if (response?.ok) {
      window.location.reload();
    }
  };

  return (
    <>
      {loading ? (
        <button className={styles.button} disabled>
          Apagando...
        </button>
      ) : (
        <button className={styles.button} onClick={handleClick}>
          Apagar
        </button>
      )}
    </>
  );
};
