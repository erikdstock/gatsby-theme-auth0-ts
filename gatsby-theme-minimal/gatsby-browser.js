import React from "react";
import { AuthenticationProvider } from "gatsby-theme-minimal";
export const wrapRootElement = ({ element }) => (
  <AuthenticationProvider>{element}</AuthenticationProvider>
);
