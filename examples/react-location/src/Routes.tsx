import { Route } from "@tanstack/react-location";
import { Home } from "./Home";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { UserAccount } from "./UserAccount";

export const Routes: Route[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user-account",
    element: <UserAccount />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
];
