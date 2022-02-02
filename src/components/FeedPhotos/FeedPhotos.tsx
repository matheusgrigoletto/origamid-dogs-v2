import { useEffect } from "react";

import styles from "./FeedPhotos.module.css";

import type { Photo } from "~types/Photo";
import { PHOTOS_GET } from "~/api";
import { useFetch } from "~hooks/useFetch";
import { FeedPhotosItem } from "~components/FeedPhotosItem";
import { Loading } from "~components/Loading";
import { Error } from "~components/Error";

type FeedPhotosProps = {
  user: number | string;
  page: number;
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo | undefined>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FeedPhotos = ({
  user,
  page = 1,
  setModalPhoto,
  setHasMore,
}: FeedPhotosProps) => {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);

      if (response && response.ok && json.length < total) {
        setHasMore(false);
      }
    }

    fetchPhotos();
  }, [request, user, page, setHasMore]);

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return (
      <ul className={`${styles.feed} slideIn`}>
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
