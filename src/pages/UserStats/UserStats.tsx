import { useEffect, lazy, Suspense } from "react";

import { STATS_GET } from "~/api";
import { useFetch } from "~hooks/useFetch";
import { Head } from "~components/Head";
import { Error } from "~components/Error";
import { Loading } from "~components/Loading";
const UserStatsGraphs = lazy(() => import("~components/UserStatsGraphs"));

export const UserStats = () => {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    async function fetchData() {
      const token = window.localStorage.getItem("token")!;
      const { url, options } = STATS_GET(token);
      await request(url, options);
    }

    fetchData();
  }, [request]);

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return (
      <>
        <Head title="Estatísticas" />
        <Suspense fallback={<Loading />}>
          <UserStatsGraphs data={data} />
        </Suspense>
      </>
    );
  }

  return null;
};
