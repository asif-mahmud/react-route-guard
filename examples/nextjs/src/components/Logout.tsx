import { useContext } from "react";
import { UserContext } from "./UserProvider";

export function Logout() {
  const { logout } = useContext(UserContext);

  return <button onClick={logout}>Logout now!</button>;
}
