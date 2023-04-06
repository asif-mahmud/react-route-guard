import { Link } from "@tanstack/react-location";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

export function Navbar() {
  const { isLoggedIn, loaded } = useContext(UserContext);

  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link to="/">Home</Link>
      <Link to="/user-account">User Account</Link>
      {loaded && !isLoggedIn && <Link to="/login">Login</Link>}
      {loaded && isLoggedIn && <Link to="/logout">Logout</Link>}
    </nav>
  );
}
