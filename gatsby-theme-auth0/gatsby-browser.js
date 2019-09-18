import React from "react";
import { AuthenticationProvider } from "gatsby-theme-auth0";
export const wrapRootElement = ({ element }) => (
  <AuthenticationProvider>{element}</AuthenticationProvider>
);
