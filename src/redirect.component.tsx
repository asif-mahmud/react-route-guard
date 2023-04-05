import { useEffect } from "react";
import { useRouteGuard } from "./use-route-guard.hook";

type RedirectProps = {
  to: string;
};

export function Redirect({ to }: RedirectProps) {
  const { routeChanger, pageLoader: PageLoader } = useRouteGuard();

  useEffect(() => {
    routeChanger(to);
  }, []);

  return <PageLoader />;
}
