import { Navigation } from ".";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
