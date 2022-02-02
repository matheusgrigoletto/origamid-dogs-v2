import { useParams } from "react-router-dom";

import { Head } from "~components/Head";
import { Feed } from "~pages/Feed";

export const UserProfile = () => {
  const { user } = useParams();

  return (
    <>
      <Head title={String(user)} />
      <section className="container main-container">
        {user && (
          <>
            <h1 className="title">{user}</h1>
            <Feed user={user} />
          </>
        )}
      </section>
    </>
  );
};
