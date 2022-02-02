import { useState, useEffect } from "react";

export const useMedia = (query: string) => {
  const [match, setMatch] = useState<boolean | null>(null);

  useEffect(() => {
    const changeMatch = () => {
      const { matches } = window.matchMedia(query);
      setMatch(matches);
    };

    changeMatch();

    window.addEventListener("resize", changeMatch);

    return () => {
      window.removeEventListener("resize", changeMatch);
    };
  }, [query]);

  return match;
};
