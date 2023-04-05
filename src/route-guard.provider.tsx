import { ElementType, PropsWithChildren, useMemo, useState } from "react";
import { RouteAdvice } from "./route-advice.type";
import { RouteGuard } from "./route-guard.component";
import { RouteChangeFunction, RouteGuardContext } from "./route-guard.context";
import { RouteVisibility } from "./route-visibility.enum";

export type RouteAdvisorFunction<T> = (context: T) => RouteAdvice;

export type RouteGuardProviderProps<T> = {
  routeAdvisor: RouteAdvisorFunction<T>;
  advisorArgs: T;
  pageLoader: ElementType;
  routeChanger: RouteChangeFunction;
};

export function RouteGuardProvider<T>({
  children,
  routeAdvisor,
  advisorArgs,
  pageLoader,
  routeChanger,
}: PropsWithChildren<RouteGuardProviderProps<T>>) {
  // Store advice for children
  const [routeAdvice, setRouteAdvice] = useState<RouteAdvice>({
    visibility: RouteVisibility.CantDecide,
    targetRoute: "",
    redirectRoute: "",
  });

  // Compute the advice of current route whenever,
  // advisor function or the arguments change
  useMemo(() => {
    setRouteAdvice(routeAdvisor(advisorArgs));
  }, [routeAdvisor, advisorArgs]);

  return (
    <RouteGuardContext.Provider
      value={{ ...routeAdvice, setRouteAdvice, pageLoader, routeChanger }}
    >
      <RouteGuard>{children}</RouteGuard>
    </RouteGuardContext.Provider>
  );
}
