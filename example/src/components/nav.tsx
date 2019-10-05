import React from "react";
import { SessionContext } from "gatsby-theme-auth0-ts";
import { Link } from "@reach/router";

export const Nav = () => {
  const { user, login, logout } = React.useContext(SessionContext);
  return user.isLoggedIn ? (
    <nav>
      <Link to="/account">Home</Link>{" "}
      <Link to="/account/settings">Settings</Link>{" "}
      <Link to="/account/billing">Billing</Link>
      <button onClick={logout}>Log Out</button>
    </nav>
  ) : (
    <nav>
      <button onClick={login}>Log In</button>
    </nav>
  );
};
