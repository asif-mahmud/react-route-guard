"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteGuardContext = void 0;
const react_1 = require("react");
const route_visibility_enum_1 = require("./route-visibility.enum");
exports.RouteGuardContext = (0, react_1.createContext)({
    visibility: route_visibility_enum_1.RouteVisibility.CantDecide,
    targetRoute: "",
    redirectRoute: "",
    setRouteAdvice: () => { },
    pageLoader: "div",
    routeChanger: () => { },
});
