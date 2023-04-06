import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { Layout } from "./Layout";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { UserAccount } from "./UserAccount";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
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
    ],
  },
]);
