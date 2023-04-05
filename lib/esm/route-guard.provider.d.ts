import { ElementType, PropsWithChildren } from "react";
import { RouteAdvice } from "./route-advice.type";
import { RouteChangeFunction } from "./route-guard.context";
export type RouteAdvisorFunction<T> = (context: T) => RouteAdvice;
export type RouteGuardProviderProps<T> = {
    routeAdvisor: RouteAdvisorFunction<T>;
    advisorArgs: T;
    pageLoader: ElementType;
    routeChanger: RouteChangeFunction;
};
export declare function RouteGuardProvider<T>({ children, routeAdvisor, advisorArgs, pageLoader, routeChanger, }: PropsWithChildren<RouteGuardProviderProps<T>>): JSX.Element;
