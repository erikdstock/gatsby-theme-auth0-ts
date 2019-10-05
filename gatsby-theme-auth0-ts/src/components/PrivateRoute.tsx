import React, { useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { SessionContext } from "./SessionProvider"
import { LoggedInUser } from "../auth/user"

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
  const { user, login } = useContext(SessionContext)

  if (user.isLoggedIn) {
    return debug ? (
      <>
        <Component user={user} location={location} {...rest} />
        <pre>Debug: {JSON.stringify(user, null, 2)}</pre>
      </>
    ) : (
      <Component user={user} location={location} {...rest} />
    )
  } else {
    login(location ? location.pathname : "/")
    return <p>Redirecting to login...</p>
  }
}
