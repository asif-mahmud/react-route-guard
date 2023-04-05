"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteGuard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const redirect_component_1 = require("./redirect.component");
const route_visibility_enum_1 = require("./route-visibility.enum");
const use_route_guard_hook_1 = require("./use-route-guard.hook");
const RouteGuard = ({ children }) => {
    const { visibility, pageLoader: PageLoader, redirectRoute } = (0, use_route_guard_hook_1.useRouteGuard)();
    // Render the children if we could definitely decide
    // showing the route
    if (visibility === route_visibility_enum_1.RouteVisibility.Show) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    // If we are to redirect user to some other route,
    // render redirect component instead
    if (visibility === route_visibility_enum_1.RouteVisibility.Redirect) {
        return (0, jsx_runtime_1.jsx)(redirect_component_1.Redirect, { to: redirectRoute });
    }
    // If we can't decide whether to show, hide or redirect,
    // just show the page loader
    return (0, jsx_runtime_1.jsx)(PageLoader, {});
};
exports.RouteGuard = RouteGuard;
