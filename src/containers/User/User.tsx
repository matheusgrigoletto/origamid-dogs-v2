import { Routes, Route } from "react-router-dom";

import { UserHeader } from "~components/UserHeader/UserHeader";
import { Feed } from "~pages/Feed/Feed";
import { UserPhotoPost } from "~pages/UserPhotoPost/UserPhotoPost";
import { UserStats } from "~pages/UserStats/UserStats";

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
