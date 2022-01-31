import { Routes, Route } from "react-router-dom";

import { UserHeader } from "~components/UserHeader";
import { Feed } from "~pages/Feed";
import { UserPhotoPost } from "~pages/UserPhotoPost";
import { UserStats } from "~pages/UserStats";

export const User = () => {
  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
      </Routes>
    </section>
  );
};
