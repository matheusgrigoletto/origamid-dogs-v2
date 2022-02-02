import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { PHOTO_GET } from "~/api";
import { useFetch } from "~hooks/useFetch";
import { Error } from "~components/Error";
import { Loading } from "~components/Loading";
import { PhotoContent } from "~components/PhotoContent";
import { Head } from "~components/Head";

export const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const fetchPhoto = async () => {
      const { url, options } = PHOTO_GET(Number(id));
      await request(url, options);
    };

    fetchPhoto();
  }, [id, request]);

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return (
      <>
        <Head title={data.photo.title} />
        <section className="container main-container">
          <PhotoContent data={data} single={true} />
        </section>
      </>
    );
  }

  return null;
};
