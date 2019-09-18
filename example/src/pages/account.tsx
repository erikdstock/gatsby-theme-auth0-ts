import React from "react";
import { Router } from "@reach/router";
import { Link } from "gatsby";
import {
  AuthenticatedRouteComponent,
  logout,
  PrivateRoute
} from "gatsby-theme-minimal";

const Home: AuthenticatedRouteComponent = ({ user }) => {
  return <p>Hi, {user.profile.nickname ? user.profile.nickname : "friend"}!</p>;
};

const Settings: AuthenticatedRouteComponent = () => <p>Settings</p>;
const Billing: AuthenticatedRouteComponent = () => <p>Billing</p>;

const Account = () => {
  return (
    <>
      <nav>
        <Link to="/account">Home</Link>{" "}
        <Link to="/account/settings">Settings</Link>{" "}
        <Link to="/account/billing">Billing</Link>{" "}
        <a
          href="#logout"
          onClick={e => {
            logout();
            e.preventDefault();
          }}
        >
          Log Out
        </a>
      </nav>
      <Router>
        <PrivateRoute component={Home} path="/account" />
        <PrivateRoute component={Settings} path="/account/settings" />
        <PrivateRoute component={Billing} path="/account/billing" />
      </Router>
    </>
  );
};
export default Account;
