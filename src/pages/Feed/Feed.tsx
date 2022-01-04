import { useState } from "react";

import { Photo } from "~/types/Photo";
import { FeedModal } from "~components/FeedModal/FeedModal";
import { FeedPhotos } from "~components/FeedPhotos/FeedPhotos";

export const Feed = () => {
  const [modalPhoto, setModalPhoto] = useState<Photo>();

  return (
    <>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      <FeedPhotos setModalPhoto={setModalPhoto} />
    </>
  );
};
