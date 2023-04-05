import { Dispatch, ElementType } from "react";
import { RouteAdvice } from "./route-advice.type";
export type RouteChangeFunction = (to: string) => void;
export declare const RouteGuardContext: import("react").Context<RouteAdvice & {
    setRouteAdvice: Dispatch<RouteAdvice>;
    pageLoader: ElementType;
    routeChanger: RouteChangeFunction;
}>;
