import { RouteGuardProvider } from "@gswag/react-route-guard";
import { useNavigate } from "@tanstack/react-location";
import { PropsWithChildren, useContext } from "react";
import { routeAdvisor } from "./routeAdvisor";
import { UserContext } from "./UserProvider";

function PageLoader() {
  return <div>Loading</div>;
}

export function Guard({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { isLoggedIn, loaded } = useContext(UserContext);

  // couldn't make useMatch to get the current path
  // so using location directly
  const pathname = window.location.pathname;

  return (
    <RouteGuardProvider
      routeAdvisor={routeAdvisor}
      advisorArgs={{ pathname, isLoggedIn, loaded }}
      pageLoader={PageLoader}
      routeChanger={(to) => navigate({ to, replace: true })}
    >
      {children}
    </RouteGuardProvider>
  );
}
