import React, { useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { login, isLoggedInUser, LoggedInUser } from "../utils/auth0"
import { AuthenticationContext } from "./AuthenticationProvider"

const debug = true

export type AuthenticatedRouteComponent = React.ComponentType<
  AuthenticatedProps & RouteComponentProps
>

export interface AuthenticatedProps {
  user: LoggedInUser
}

export interface PrivateRouteProps extends RouteComponentProps {
  component: AuthenticatedRouteComponent
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  location,
  ...rest
}) => {
  const { user } = useContext(AuthenticationContext)

  if (!isLoggedInUser(user)) {
    login(location ? location.pathname : "/")
    return <p>Redirecting to login...</p>
  } else {
    return debug ? (
      <>
        <Component user={user} location={location} {...rest} />
        <pre>Debug: {JSON.stringify(user, null, 2)}</pre>
      </>
    ) : (
      <Component user={user} location={location} {...rest} />
    )
  }
}
