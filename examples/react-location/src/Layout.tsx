import { Outlet } from "@tanstack/react-location";
import { Guard } from "./Guard";
import { Navbar } from "./Navbar";
import { UserProvider } from "./UserProvider";

export function Layout() {
  return (
    <UserProvider>
      {/* navigation */}
      <Navbar />

      {/* wrap pages withing guard */}
      <Guard>
        {/* render pages inside */}
        <Outlet />
      </Guard>
    </UserProvider>
  );
}
