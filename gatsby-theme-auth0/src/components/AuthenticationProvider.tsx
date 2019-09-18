import React from "react"
import { navigate } from "gatsby"
import { User, AnonymousUser } from "../utils/auth0"
import { SessionCheck } from "./SessionCheck"

export interface UserContext {
  user: User
  setUser: (u: User) => void
  logout: () => void
}

export const AuthenticationContext = React.createContext<UserContext>({
  user: AnonymousUser,
  setUser: () => {},
  logout: () => {},
})

export class AuthenticationProvider extends React.Component<
  any,
  { user: User }
> {
  state = { user: AnonymousUser }

  setUser = (user: User) => {
    this.setState({ user })
  }

  logout = () => {
    this.setUser(AnonymousUser)
    navigate("/")
  }

  render() {
    return (
      <AuthenticationContext.Provider
        value={{
          user: this.state.user,
          setUser: this.setUser,
          logout: this.logout,
        }}
      >
        <AuthenticationContext.Consumer>
          {(authContext: UserContext) => {
            return (
              <>
                <SessionCheck userContext={authContext}>
                  {this.props.children}
                </SessionCheck>
              </>
            )
          }}
        </AuthenticationContext.Consumer>
      </AuthenticationContext.Provider>
    )
  }
}
