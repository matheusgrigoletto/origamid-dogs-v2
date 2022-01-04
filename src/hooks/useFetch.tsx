import { useState, useCallback } from "react";

export const useFetch = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(async (url: string, options: Object) => {
    let response;
    let json;

    try {
      setError(null);
      setLoading(true);

      response = await fetch(url, options);
      json = await response.json();

      if (response.ok === false) {
        throw new Error(json.message);
      }
    } catch (err: any) {
      json = null;

      setError(err.message);
    } finally {
      setLoading(false);
      setData(json);

      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};
