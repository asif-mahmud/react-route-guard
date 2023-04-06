import { useContext, useState } from "react";
import { UserContext } from "./UserProvider";

export function Login() {
  const [username, setUsername] = useState("");
  const { login } = useContext(UserContext);

  return (
    <form
      style={{ display: "flex", gap: "1rem" }}
      onSubmit={(e) => {
        e.preventDefault();
        login(username);
      }}
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}
