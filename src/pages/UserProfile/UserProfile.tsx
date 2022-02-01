import { useParams } from "react-router-dom";

import { Head } from "~components/Head";
import { Feed } from "~pages/Feed";

export const UserProfile = () => {
  const { user } = useParams();
  return (
    <>
      <Head title={user!} />
      <section className="container main-container">
        <h1 className="title">{user}</h1>
        {user && <Feed user={user} />}
      </section>
    </>
  );
};
