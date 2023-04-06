import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

export function Navbar() {
  const { isLoggedIn, loaded } = useContext(UserContext);

  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link href="/">Home</Link>
      <Link href="/user-account">User Account</Link>
      {loaded && !isLoggedIn && <Link href="/login">Login</Link>}
      {loaded && isLoggedIn && <Link href="/logout">Logout</Link>}
    </nav>
  );
}
