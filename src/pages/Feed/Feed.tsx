import { useEffect, useState } from "react";

import type { Photo } from "~types/Photo";
import { FeedModal } from "~components/FeedModal";
import { FeedPhotos } from "~components/FeedPhotos";

type FeedProps = {
  user: number | string;
};

export const Feed = ({ user }: FeedProps) => {
  const [modalPhoto, setModalPhoto] = useState<Photo>();
  const [pages, setPages] = useState<number[]>([1]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    let wait = false;
    let timeout: any;

    const infinteScroll = () => {
      if (hasMore) {
        const scrollY = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;

        if (scrollY > height * 0.75 && !wait) {
          setPages((pages: number[]) => [...pages, pages.length + 1]);
          wait = true;

          timeout = setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    };

    window.addEventListener("wheel", infinteScroll);
    window.addEventListener("scroll", infinteScroll);

    return () => {
      window.removeEventListener("wheel", infinteScroll);
      window.removeEventListener("scroll", infinteScroll);
      clearTimeout(timeout);
    };
  }, [hasMore]);

  return (
    <>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page: number) => (
        <FeedPhotos
          key={page}
          page={page}
          user={user}
          setModalPhoto={setModalPhoto}
          setHasMore={setHasMore}
        />
      ))}
    </>
  );
};
