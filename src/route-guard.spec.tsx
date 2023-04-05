import { fireEvent, render, screen } from "@testing-library/react";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { RouteAdvice } from "./route-advice.type";
import { RouteGuardProvider } from "./route-guard.provider";
import { RouteVisibility } from "./route-visibility.enum";

const PageLoaderText = "Loading";
const HomePageRoute = "/";
const HomePageText = "Home";
const HomePageLinkText = "Home";
const UserAccountPageRoute = "/user";
const UserAccountPageText = "User account";
const UserAccountPageLinkText = "User account";
const LogoutPageRoute = "/logout";
const LogoutPageLinkText = "Logout";
const LogoutButtonText = "Logout now";
const LoginButtonText = "Login";

function PageLoader() {
  return <div>{PageLoaderText}</div>;
}

const GlobalContext = createContext<{
  loggedIn: boolean;
  setLoggedIn: Dispatch<boolean>;
  route: string;
  setRoute: Dispatch<string>;
}>({ loggedIn: false, setLoggedIn: () => {}, route: "", setRoute: () => {} });

function HomePage() {
  return <>{HomePageText}</>;
}

function UserAccountPage() {
  return <>{UserAccountPageText}</>;
}

function LogoutPage() {
  const { setLoggedIn } = useContext(GlobalContext);

  return <button onClick={() => setLoggedIn(false)}>{LogoutButtonText}</button>;
}

function Navbar({ children }: PropsWithChildren) {
  const { setLoggedIn, setRoute } = useContext(GlobalContext);

  return (
    <>
      {/* Scope for user intractions */}
      <nav>
        <button onClick={() => setRoute(HomePageRoute)}>
          {HomePageLinkText}
        </button>
        <button onClick={() => setLoggedIn(true)}>{LoginButtonText}</button>
        <button onClick={() => setRoute(UserAccountPageRoute)}>
          {UserAccountPageLinkText}
        </button>
        <button onClick={() => setRoute(LogoutPageRoute)}>
          {LogoutPageLinkText}
        </button>
      </nav>

      {/* Render rest of the providers and pages */}
      {children}
    </>
  );
}

function Pages() {
  const { route } = useContext(GlobalContext);

  return (
    <main>
      {route === HomePageRoute && <HomePage />}
      {route === UserAccountPageRoute && <UserAccountPage />}
      {route === LogoutPageRoute && <LogoutPage />}
    </main>
  );
}

function Application() {
  return <Pages />;
}

function GlobalContextProvider() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [route, setRoute] = useState(HomePageRoute);

  const routeAdvisor = ({
    loggedIn,
    route,
  }: {
    loggedIn: boolean;
    route: string;
  }): RouteAdvice => {
    // home page is public for all types of users - logged in or
    // anonymous any type
    if (route === HomePageRoute) {
      return {
        visibility: RouteVisibility.Show,
        targetRoute: route,
        redirectRoute: "",
      };
    }

    // user account page and logout page is only for logged in users,
    // so if anonymous users try to go to these pages they should be
    // redirected to home page
    if (
      !loggedIn &&
      [UserAccountPageRoute, LogoutPageRoute].some((r) => r === route)
    ) {
      return {
        visibility: RouteVisibility.Redirect,
        targetRoute: route,
        redirectRoute: HomePageRoute,
      };
    }

    // logged in user should be able to visit any page
    if (loggedIn) {
      return {
        visibility: RouteVisibility.Show,
        targetRoute: route,
        redirectRoute: "",
      };
    }

    return {
      visibility: RouteVisibility.CantDecide,
      targetRoute: route,
      redirectRoute: route,
    };
  };

  return (
    <GlobalContext.Provider value={{ loggedIn, setLoggedIn, route, setRoute }}>
      <Navbar>
        <RouteGuardProvider
          pageLoader={PageLoader}
          advisorArgs={{ loggedIn, route }}
          routeAdvisor={routeAdvisor}
          routeChanger={(to) => {
            setRoute(to);
          }}
        >
          <Application />
        </RouteGuardProvider>
      </Navbar>
    </GlobalContext.Provider>
  );
}

describe("route guard provider", () => {
  it("should render page loader at first", async () => {
    let routeAdvisorWasCalled = false;
    render(
      <RouteGuardProvider
        pageLoader={PageLoader}
        advisorArgs={{}}
        routeAdvisor={() => {
          routeAdvisorWasCalled = true;
          return {
            visibility: RouteVisibility.CantDecide,
            targetRoute: "/",
            redirectRoute: "",
          };
        }}
        routeChanger={() => {}}
      >
        <div>Child</div>
      </RouteGuardProvider>
    );

    const child = screen.queryByText(PageLoaderText);
    expect(child).toBeTruthy();
    expect(child?.textContent).toBe(PageLoaderText);
    expect(routeAdvisorWasCalled).toBe(true);
  });
});

describe("route guard provider guarding an application", () => {
  // setup stage
  beforeEach(() => {
    // render our example app
    render(<GlobalContextProvider />);
  });

  it("should render home page for all types of users", () => {
    const child = screen.queryByRole("main");
    expect(child).toBeTruthy();
    expect(child?.textContent).toBe(HomePageText);
  });

  it("should redirect anonymous users to home page if they try to visit user account page", async () => {
    // try to visit user account page without logging in
    const userAccountPageBtn = screen.getByRole("button", {
      name: HomePageLinkText,
    });
    fireEvent.click(userAccountPageBtn);

    // get the final page view, it should be home page
    const child = await screen.findByRole("main");
    expect(child.textContent).toBe(HomePageText);
  });

  it("should redirect anonymous users to home page if they try to visit logout page", async () => {
    // try to visit logout page without logging in
    const logoutPageBtn = screen.getByRole("button", {
      name: LogoutPageLinkText,
    });
    fireEvent.click(logoutPageBtn);

    // get the final page view, it should be home page
    const child = await screen.findByRole("main");
    expect(child.textContent).toBe(HomePageText);
  });

  it("should allow logged in user to visit user account page", async () => {
    // login user
    const loginBtn = screen.getByRole("button", { name: LoginButtonText });
    fireEvent.click(loginBtn);

    // should still be inside main
    let child = await screen.findByRole("main");
    expect(child.textContent).toBe(HomePageText);

    // lets try to visit user account page
    const userAccountPageBtn = screen.getByRole("button", {
      name: UserAccountPageLinkText,
    });
    fireEvent.click(userAccountPageBtn);

    child = await screen.findByRole("main");
    expect(child.textContent).toBe(UserAccountPageText);
  });

  it("should allow logged in user to visit logout page", async () => {
    // login user
    const loginBtn = screen.getByRole("button", { name: LoginButtonText });
    fireEvent.click(loginBtn);

    // should still be inside main
    const child = await screen.findByRole("main");
    expect(child.textContent).toBe(HomePageText);

    // lets try to visit logout page
    const logoutPageBtn = screen.getByRole("button", {
      name: LogoutPageLinkText,
    });
    fireEvent.click(logoutPageBtn);

    // just wait for rendering to finish
    await screen.findByRole("navigation");

    const logoutBtn = screen.queryByRole("button", { name: LogoutButtonText });
    expect(logoutBtn).toBeTruthy();
    expect(logoutBtn?.textContent).toBe(LogoutButtonText);
  });

  it("should allow logged in user to logout", async () => {
    // login user
    const loginBtn = screen.getByRole("button", { name: LoginButtonText });
    fireEvent.click(loginBtn);

    // should still be inside main
    let child = await screen.findByRole("main");
    expect(child.textContent).toBe(HomePageText);

    // lets try to visit logout page
    const logoutPageBtn = screen.getByRole("button", {
      name: LogoutPageLinkText,
    });
    fireEvent.click(logoutPageBtn);

    // try to logout
    const logoutBtn = await screen.findByRole("button", {
      name: LogoutButtonText,
    });
    fireEvent.click(logoutBtn);

    // wait for rendering to finish
    await screen.findByRole("navigation");

    // user should be now at home page
    child = await screen.findByRole("main");
    expect(child.textContent).toBe(HomePageText);
  });
});
