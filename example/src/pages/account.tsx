import React from "react";
import { Router } from "@reach/router";
import { Link } from "gatsby";
import { AuthenticatedRouteComponent, PrivateRoute } from "gatsby-theme-auth0";
import { Nav } from "../components/nav";

const Home: AuthenticatedRouteComponent = ({ user }) => {
  return <p>Hi, {user.profile.nickname ? user.profile.nickname : "friend"}!</p>;
};

const Settings: AuthenticatedRouteComponent = () => <p>Settings</p>;
const Billing: AuthenticatedRouteComponent = () => <p>Billing</p>;

const Account = () => {
  return (
    <>
      <Nav />

      <Router>
        <PrivateRoute component={Home} path="/account" />
        <PrivateRoute component={Settings} path="/account/settings" />
        <PrivateRoute component={Billing} path="/account/billing" />
      </Router>
    </>
  );
};
export default Account;
