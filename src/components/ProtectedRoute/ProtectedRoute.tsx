import { useContext, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "~/UserContext";

export const ProtectedRoute = ({ children }: PropsWithChildren<any>) => {
  const { login } = useContext(UserContext);

  return login ? children : <Navigate to="/login" />;
};
