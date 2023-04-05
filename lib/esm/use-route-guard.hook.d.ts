/// <reference types="react" />
import { RouteVisibility } from "./route-visibility.enum";
export declare function useRouteGuard(): {
    redirect: (to: string) => void;
    visibility: RouteVisibility;
    targetRoute: string;
    redirectRoute: string;
    setRouteAdvice: import("react").Dispatch<import("./route-advice.type").RouteAdvice>;
    pageLoader: import("react").ElementType;
    routeChanger: import("./route-guard.context").RouteChangeFunction;
};
