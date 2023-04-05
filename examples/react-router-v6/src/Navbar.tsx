import { useContext } from "react";
import { UserContext } from "./UserProvider";

export function Navbar() {
  const { isLoggedIn, loaded } = useContext(UserContext);

  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <a href="/">Home</a>
      <a href="/user-account">User Account</a>
      {loaded && !isLoggedIn && <a href="/login">Login</a>}
      {loaded && isLoggedIn && <a href="/logout">Logout</a>}
    </nav>
  );
}
