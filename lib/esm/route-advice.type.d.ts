import { RouteVisibility } from "./route-visibility.enum";
export type RouteAdvice = {
    visibility: RouteVisibility;
    targetRoute: string;
    redirectRoute: string;
};
