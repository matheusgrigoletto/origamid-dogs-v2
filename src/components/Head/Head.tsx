import { useEffect } from "react";

type HeadProps = {
  title: string;
  description?: string;
};

export const Head = (props: HeadProps) => {
  useEffect(() => {
    document.title = `${props.title} | Dogos`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", props.description || "");
  }, [props]);

  return <></>;
};
