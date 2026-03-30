import type React from "react";

interface Args {
  children: React.ReactNode;
}

const Layout = async ({ children }: Args) => {
  return <>{children}</>;
};

export default Layout;
