import React from "react"
import { Router } from "@reach/router"
import { PrivateRoute, PrivateRouteComponent } from "gatsby-theme-auth0-ts"
import { Layout } from "../components/layout"

const Home: PrivateRouteComponent = ({ user }) => {
  return <p>Hi, {user.profile.nickname ? user.profile.nickname : "friend"}!</p>
}

const Settings = () => <p>Settings</p>
const Billing = () => <p>Billing</p>

const Account = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute component={Home} path="/account" />
        <PrivateRoute component={Settings} path="/account/settings" />
        <PrivateRoute component={Billing} path="/account/billing" />
      </Router>
    </Layout>
  )
}
export default Account
