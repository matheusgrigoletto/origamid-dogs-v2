import { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./PhotoContent.module.css";

import { UserContext } from "~/UserContext";
import type { Photo } from "~/types/Photo";
import type { Comment } from "~/types/Comment";
import { PhotoComments } from "~components/PhotoComments";
import { PhotoDeleteButton } from "~components/PhotoDeleteButton";
import { Image } from "~components/Image";

type PhotoContentProps = {
  data: {
    photo: Photo;
    comments: Comment[];
  };
};

export const PhotoContent = ({ data }: PhotoContentProps) => {
  const user = useContext(UserContext);
  const { photo, comments } = data;

  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user.data && user.data.username === photo.author ? (
              <PhotoDeleteButton id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.views}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            {Number(photo.idade) > 1 && <li>{photo.idade} anos</li>}
            {Number(photo.idade) === 1 && <li>{photo.idade} ano</li>}
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} />
    </div>
  );
};
