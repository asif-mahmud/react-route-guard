import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const UserContext = createContext<{
  isLoggedIn: boolean;
  user: string;
  login: (user: string) => void;
  logout: () => void;
  loaded: boolean;
}>({
  isLoggedIn: false,
  user: "",
  login: () => {},
  logout: () => {},
  loaded: false,
});

export function UserProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const prevUser = localStorage.getItem("user");
    if (prevUser) {
      setUser(prevUser);
      setIsLoggedIn(true);
    }
    setLoaded(true);
  }, []);

  const login = (user: string) => {
    if (user) {
      setUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("user", user);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser("");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, user, login, logout, loaded }}>
      {children}
    </UserContext.Provider>
  );
}
