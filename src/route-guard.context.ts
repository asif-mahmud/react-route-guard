import { createContext, Dispatch, ElementType } from "react";
import { RouteAdvice } from "./route-advice.type";
import { RouteVisibility } from "./route-visibility.enum";

export type RouteChangeFunction = (to: string) => void;

export const RouteGuardContext = createContext<
  RouteAdvice & {
    setRouteAdvice: Dispatch<RouteAdvice>;
    pageLoader: ElementType;
    routeChanger: RouteChangeFunction;
  }
>({
  visibility: RouteVisibility.CantDecide,
  targetRoute: "",
  redirectRoute: "",
  setRouteAdvice: () => {},
  pageLoader: "div",
  routeChanger: () => {},
});
