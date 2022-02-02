import { useEffect, MouseEvent } from "react";

import styles from "./FeedModal.module.css";

import type { Photo } from "~types/Photo";
import { PHOTO_GET } from "~/api";
import { useFetch } from "~hooks/useFetch";
import { Error } from "~components/Error";
import { Loading } from "~components/Loading";
import { PhotoContent } from "~components/PhotoContent";

type FeedModalProps = {
  photo: Photo;
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo | undefined>>;
};

export const FeedModal = ({ photo, setModalPhoto }: FeedModalProps) => {
  const { data, loading, error, request } = useFetch();

  const handleOutsideClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      setModalPhoto(undefined);
    }
  };

  useEffect(() => {
    async function fetchPhoto() {
      const { url, options } = PHOTO_GET(photo.id);
      await request(url, options);
    }

    fetchPhoto();
  }, [photo, request]);

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error message={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};
