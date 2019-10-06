import React from "react"
import { User, AnonymousUser } from "../auth/user"
import { navigate, GatsbyBrowser } from "gatsby"
import { auth0Service as auth } from "../auth/auth0Service"
import { isBrowser } from "../utils/environment"

// TODO: consider combining
interface SessionState {
  isLoading: boolean
  user: User
}

export interface Session extends SessionState {
  setUser: (u: User) => void
  logout: () => void
  login: () => void
}

export const SessionContext = React.createContext<Session>({
  isLoading: true,
  user: AnonymousUser,
  setUser: () => {},
  logout: () => {},
  login: () => {},
})

/**
 * Wrap our app in the session provider.
 */
export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => {
  return <SessionProvider>{element}</SessionProvider>
}

/**
 * The SessionProvider maintains user authentication state and provides it to the app
 * via the context API. Auth0-related functions are proxied to the Auth service singleton.
 */
export const SessionProvider: React.FC<{}> = ({ children }) => {
  const [sessionState, setSessionState] = React.useState<SessionState>({
    isLoading: true,
    user: AnonymousUser,
  })

  const setUser = (user: User) => {
    console.log("setting user")
    setSessionState({ isLoading: false, user })
  }

  const logout = () => {
    setSessionState({ isLoading: false, user: AnonymousUser })
    auth.logout()
    navigate("/")
  }

  const login = () => auth.login()

  React.useEffect(() => {
    if (isBrowser) {
      console.log("about to check session")
      auth.checkSession().then(setUser)
    }
  }, [])

  return (
    <SessionContext.Provider
      value={{ ...sessionState, setUser, logout, login }}
    >
      {children}
    </SessionContext.Provider>
  )
}
