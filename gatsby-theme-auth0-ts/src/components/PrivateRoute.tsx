import React, { useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { SessionContext } from "./SessionProvider"
import { LoggedInUser } from "../auth/user"

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
  const { user, authorize } = useContext(SessionContext)

  if (user.isLoggedIn) {
    return <Component user={user} location={location} {...rest} />
  } else {
    authorize()
    return <p>Redirecting to login...</p>
  }
}
