import { RouteGuardProvider } from "@gswag/react-route-guard";
import { useRouter } from "next/router";
import { PropsWithChildren, useContext } from "react";
import { routeAdvisor } from "./routeAdvisor";
import { UserContext } from "./UserProvider";

function PageLoader() {
  return <div>Loading</div>;
}

export function Guard({ children }: PropsWithChildren) {
  const { pathname, push } = useRouter();
  const { isLoggedIn, loaded } = useContext(UserContext);

  return (
    <RouteGuardProvider
      routeAdvisor={routeAdvisor}
      advisorArgs={{ pathname, isLoggedIn, loaded }}
      pageLoader={PageLoader}
      routeChanger={push}
    >
      {children}
    </RouteGuardProvider>
  );
}
