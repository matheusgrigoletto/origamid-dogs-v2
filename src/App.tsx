import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { UserStorage } from "./UserContext";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Home } from "./pages/Home/Home";
import { Auth } from "./containers/Auth/Auth";
import { User } from "./containers/User/User";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Header />
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
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
