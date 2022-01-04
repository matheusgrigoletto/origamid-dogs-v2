import { useEffect } from "react";

import styles from "./FeedPhotos.module.css";
import type { Photo } from "~/types/Photo";
import { PHOTOS_GET } from "~/api";
import { useFetch } from "~hooks/useFetch";
import { FeedPhotosItem } from "~components/FeedPhotosItem/FeedPhotosItem";
import { Loading } from "~components/Loading/Loading";
import { Error } from "~components/Error/Error";

type FeedPhotosProps = {
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo | undefined>>;
};

export const FeedPhotos = ({ setModalPhoto }: FeedPhotosProps) => {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
      await request(url, options);
    }

    fetchPhotos();
  }, [request]);

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo: Photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  }

  return null;
};
