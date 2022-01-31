import { useState } from "react";

import type { Photo } from "~/types/Photo";
import { FeedModal } from "~components/FeedModal";
import { FeedPhotos } from "~components/FeedPhotos";

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
