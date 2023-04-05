import { useContext } from "react";
import { RouteGuardContext } from "./route-guard.context";
import { RouteVisibility } from "./route-visibility.enum";

export function useRouteGuard() {
  const ctx = useContext(RouteGuardContext);

  // Provide a simple wrapper for redirecting through
  // the route guard interface
  const redirect = (to: string) => {
    ctx.setRouteAdvice({
      visibility: RouteVisibility.Redirect,
      redirectRoute: to,
      targetRoute: to,
    });
  };

  return { ...ctx, redirect };
}
