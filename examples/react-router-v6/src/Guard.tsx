import { RouteGuardProvider } from "@gswag/react-route-guard";
import { PropsWithChildren, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routeAdvisor } from "./routeAdvisor";
import { UserContext } from "./UserProvider";

function PageLoader() {
  return <div>Loading</div>;
}

export function Guard({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, loaded } = useContext(UserContext);

  return (
    <RouteGuardProvider
      routeAdvisor={routeAdvisor}
      advisorArgs={{ pathname, isLoggedIn, loaded }}
      pageLoader={PageLoader}
      routeChanger={navigate}
    >
      {children}
    </RouteGuardProvider>
  );
}
