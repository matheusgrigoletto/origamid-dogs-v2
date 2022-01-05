import styles from "./FeedPhotosItem.module.css";
import type { Photo } from "~/types/Photo";
import { Image } from "~components/Image/Image";

type FeedPhotosItemProps = {
  photo: Photo;
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo | undefined>>;
};

export const FeedPhotosItem = ({
  photo,
  setModalPhoto,
}: FeedPhotosItemProps) => {
  const handleClick = () => {
    setModalPhoto(photo);
  };

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.views}>{photo.acessos}</span>
    </li>
  );
};
