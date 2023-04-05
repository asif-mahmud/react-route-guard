"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redirect = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const use_route_guard_hook_1 = require("./use-route-guard.hook");
function Redirect({ to }) {
    const { routeChanger, pageLoader: PageLoader } = (0, use_route_guard_hook_1.useRouteGuard)();
    (0, react_1.useEffect)(() => {
        routeChanger(to);
    }, []);
    return (0, jsx_runtime_1.jsx)(PageLoader, {});
}
exports.Redirect = Redirect;
