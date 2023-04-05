import { useMemo } from "react";
import { useRouteGuard } from "./use-route-guard.hook";

type RedirectProps = {
  to: string;
};

export function Redirect({ to }: RedirectProps) {
  const { routeChanger, pageLoader: PageLoader } = useRouteGuard();

  useMemo(() => {
    routeChanger(to);
  }, []);

  return <PageLoader />;
}
