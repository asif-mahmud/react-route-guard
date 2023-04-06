import { RouteAdvice, RouteVisibility } from "@gswag/react-route-guard";

export function routeAdvisor({
  pathname,
  isLoggedIn,
  loaded,
}: {
  pathname: string;
  isLoggedIn: boolean;
  loaded: boolean;
}): RouteAdvice {
  // we can't decide until user info is loaded in memory
  if (!loaded) {
    return {
      visibility: RouteVisibility.CantDecide,
      targetRoute: pathname,
      redirectRoute: "",
    };
  }

  // home page open for all
  if (pathname === "/") {
    return {
      visibility: RouteVisibility.Show,
      targetRoute: pathname,
      redirectRoute: "",
    };
  }

  // only anonymous user can see login page, we want to
  // redirect him to home page
  // login route should be visible by anonymous users only
  if (pathname === "/login") {
    if (isLoggedIn) {
      return {
        visibility: RouteVisibility.Redirect,
        targetRoute: pathname,
        redirectRoute: "/",
      };
    } else {
      return {
        visibility: RouteVisibility.Show,
        targetRoute: pathname,
        redirectRoute: "",
      };
    }
  }

  // only logged in user can see user account, logout pages
  if (["/user-account", "/logout"].some((p) => p === pathname)) {
    if (isLoggedIn) {
      return {
        visibility: RouteVisibility.Show,
        targetRoute: pathname,
        redirectRoute: "",
      };
    } else {
      return {
        visibility: RouteVisibility.Redirect,
        targetRoute: pathname,
        redirectRoute: "/",
      };
    }
  }

  // otherwise can't decide whether to show the page or not
  return {
    visibility: RouteVisibility.CantDecide,
    targetRoute: pathname,
    redirectRoute: "",
  };
}
