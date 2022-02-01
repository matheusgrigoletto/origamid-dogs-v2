import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { UserStorage } from "./UserContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Auth } from "./containers/Auth";
import { User } from "./containers/User";
import { Home } from "./pages/Home";
import { Photo } from "./pages/Photo";
import { UserProfile } from "~pages/UserProfile";
import { NotFound } from "~pages/NotFound";

export const App = () => {
  return (
    <main className="app">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <article className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Auth />} />
              <Route
                path="conta/*"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
              <Route path="foto/:id" element={<Photo />} />
              <Route path="perfil/:user" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </article>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </main>
  );
};
