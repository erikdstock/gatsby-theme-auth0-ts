import React, { useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { SessionContext } from "./SessionProvider"
import { LoggedInUser } from "../auth/user"

export type PrivateRouteComponent = React.ComponentType<
  AuthenticatedProps & RouteComponentProps
>

export interface AuthenticatedProps {
  user: LoggedInUser
}

export interface PrivateRouteProps extends RouteComponentProps {
  component: PrivateRouteComponent
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
