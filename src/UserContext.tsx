import {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactChildren,
  ReactElement,
} from "react";
import { useNavigate } from "react-router-dom";

import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";

export type UserContextType = {
  userLogin: (username: string, password: string) => Promise<void>;
  userLogout: () => Promise<void>;
  data: any | null;
  error: string | null;
  loading: boolean;
  login: boolean | null;
};

export const UserContext = createContext({} as UserContextType);

export const UserStorage = ({
  children,
}: {
  children: ReactChildren | ReactElement | ReactElement[];
}) => {
  const [data, setData] = useState<Object | null>(null);
  const [login, setLogin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userLogout = useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);

      window.localStorage.removeItem("token");

      navigate("/login");
    },
    [navigate],
  );

  async function getUser(token: string) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();

    setData(json);
    setLogin(true);
  }

  async function userLogin(username: string, password: string) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });
      const tokenResponse = await fetch(url, options);

      if (!tokenResponse.ok) {
        throw new Error(`Error: ${tokenResponse.statusText}`);
      }

      const { token } = await tokenResponse.json();

      window.localStorage.setItem("token", token);

      await getUser(token);
      navigate("/conta");
    } catch (err: any) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");

      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);

          if (!response.ok) {
            throw new Error("Token inválido");
          }

          await getUser(token);
        } catch (err: any) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }

    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
