import { SyntheticEvent, useState } from "react";

import styles from "./Image.module.css";

type ImageProps = {
  alt: string;
  [key: string]: string | any;
};

export const Image = ({ alt, ...props }: ImageProps) => {
  const [skeleton, setSkeleton] = useState(true);

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setSkeleton(false);
    (event.target as HTMLImageElement).style.opacity = "1";
  };

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
    </div>
  );
};
