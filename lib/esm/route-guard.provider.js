"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteGuardProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const route_guard_component_1 = require("./route-guard.component");
const route_guard_context_1 = require("./route-guard.context");
const route_visibility_enum_1 = require("./route-visibility.enum");
function RouteGuardProvider({ children, routeAdvisor, advisorArgs, pageLoader, routeChanger, }) {
    // Store advice for children
    const [routeAdvice, setRouteAdvice] = (0, react_1.useState)({
        visibility: route_visibility_enum_1.RouteVisibility.CantDecide,
        targetRoute: "",
        redirectRoute: "",
    });
    // Compute the advice of current route whenever,
    // advisor function or the arguments change
    (0, react_1.useMemo)(() => {
        setRouteAdvice(routeAdvisor(advisorArgs));
    }, [routeAdvisor, advisorArgs]);
    return ((0, jsx_runtime_1.jsx)(route_guard_context_1.RouteGuardContext.Provider, Object.assign({ value: Object.assign(Object.assign({}, routeAdvice), { setRouteAdvice, pageLoader, routeChanger }) }, { children: (0, jsx_runtime_1.jsx)(route_guard_component_1.RouteGuard, { children: children }) })));
}
exports.RouteGuardProvider = RouteGuardProvider;
