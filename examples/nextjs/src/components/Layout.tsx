import { PropsWithChildren } from "react";
import { Guard } from "./Guard";
import { Navbar } from "./Navbar";
import { UserProvider } from "./UserProvider";

export function Layout({ children }: PropsWithChildren) {
  return (
    <UserProvider>
      {/* navigation */}
      <Navbar />

      {/* wrap pages withing guard */}
      <Guard>
        {/* render pages inside */}
        {children}
      </Guard>
    </UserProvider>
  );
}
