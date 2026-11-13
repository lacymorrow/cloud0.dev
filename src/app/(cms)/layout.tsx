import type React from "react";

interface Args {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/require-await -- keeps the Promise-returning signature of the Auth.js API
const Layout = async ({ children }: Args) => {
  return <>{children}</>;
};

export default Layout;
