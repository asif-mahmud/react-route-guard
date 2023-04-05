import { FC, PropsWithChildren } from "react";
import { Redirect } from "./redirect.component";
import { RouteVisibility } from "./route-visibility.enum";
import { useRouteGuard } from "./use-route-guard.hook";

export const RouteGuard: FC<PropsWithChildren> = ({ children }) => {
  const { visibility, pageLoader: PageLoader, redirectRoute } = useRouteGuard();

  // Render the children if we could definitely decide
  // showing the route
  if (visibility === RouteVisibility.Show) {
    return <>{children}</>;
  }

  // If we are to redirect user to some other route,
  // render redirect component instead
  if (visibility === RouteVisibility.Redirect) {
    return <Redirect to={redirectRoute} />;
  }

  // If we can't decide whether to show, hide or redirect,
  // just show the page loader
  return <PageLoader />;
};
