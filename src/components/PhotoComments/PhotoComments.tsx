import { useContext, useEffect, useRef, useState } from "react";

import styles from "./PhotoComments.module.css";

import type { Comment } from "~/types/Comment";
import { UserContext } from "~/UserContext";
import { PhotoCommentsForm } from "~components/PhotoCommentsForm";

type PhotoCommentsProps = {
  id: number;
  comments: Comment[];
};

export const PhotoComments = (props: PhotoCommentsProps) => {
  const [comments, setComments] = useState(() => props.comments);
  const { login } = useContext(UserContext);
  const commentsSection = useRef<HTMLUListElement>(null);

  useEffect(() => {
    commentsSection.current!.scrollTop = commentsSection.current!.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul className={styles.comments} ref={commentsSection}>
        {comments.map((comment: Comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm id={props.id} setComments={setComments} />}
    </>
  );
};
