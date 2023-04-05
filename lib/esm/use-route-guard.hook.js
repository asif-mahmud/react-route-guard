"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouteGuard = void 0;
const react_1 = require("react");
const route_guard_context_1 = require("./route-guard.context");
const route_visibility_enum_1 = require("./route-visibility.enum");
function useRouteGuard() {
    const ctx = (0, react_1.useContext)(route_guard_context_1.RouteGuardContext);
    // Provide a simple wrapper for redirecting through
    // the route guard interface
    const redirect = (to) => {
        ctx.setRouteAdvice({
            visibility: route_visibility_enum_1.RouteVisibility.Redirect,
            redirectRoute: to,
            targetRoute: to,
        });
    };
    return Object.assign(Object.assign({}, ctx), { redirect });
}
exports.useRouteGuard = useRouteGuard;
