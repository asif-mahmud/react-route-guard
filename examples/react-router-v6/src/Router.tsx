import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { Layout } from "./Layout";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { UserAccountPage } from "./UserAccount";

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
        element: <UserAccountPage />,
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
