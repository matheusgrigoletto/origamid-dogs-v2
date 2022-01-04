import type { Comment } from "~/types/Comment";

type PhotoCommentsProps = {
  id: number;
  comments: Comment[];
};

export const PhotoComments = ({ id, comments }: PhotoCommentsProps) => {
  return <div></div>;
};
