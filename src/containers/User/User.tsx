import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { UserContext } from "~/UserContext";
import { Head } from "~components/Head";
import { UserHeader } from "~components/UserHeader";
import { Feed } from "~pages/Feed";
import { NotFound } from "~pages/NotFound";
import { UserPhotoPost } from "~pages/UserPhotoPost";
import { UserStats } from "~pages/UserStats";

export const User = () => {
  const { data } = useContext(UserContext);

  return (
    <>
      <Head title="Minha conta" />
      <section className="container">
        <UserHeader />
        <Routes>
          <Route path="/" element={<Feed user={data.id} />} />
          <Route path="postar" element={<UserPhotoPost />} />
          <Route path="estatisticas" element={<UserStats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>
    </>
  );
};
