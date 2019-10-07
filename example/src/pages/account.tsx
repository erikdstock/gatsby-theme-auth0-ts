import React from "react";
import { Router } from "@reach/router";
import {
  AuthenticatedRouteComponent,
  PrivateRoute
} from "gatsby-theme-auth0-ts";
import { Layout } from "../components/layout";

const Home: AuthenticatedRouteComponent = ({ user }) => {
  return <p>Hi, {user.profile.nickname ? user.profile.nickname : "friend"}!</p>;
};

const Settings: AuthenticatedRouteComponent = () => <p>Settings</p>;
const Billing: AuthenticatedRouteComponent = () => <p>Billing</p>;

const Account = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute component={Home} path="/account" />
        <PrivateRoute component={Settings} path="/account/settings" />
        <PrivateRoute component={Billing} path="/account/billing" />
      </Router>
    </Layout>
  );
};
export default Account;
