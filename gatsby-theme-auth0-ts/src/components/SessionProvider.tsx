import React from "react"
import { User, AnonymousUser } from "../auth/user"
import { GatsbyBrowser } from "gatsby"
import { singleton as auth } from "../auth/auth0Service"
import { isBrowser } from "../utils/environment"

// TODO: consider combining
interface SessionState {
  isLoading: boolean
  user: User
}

export interface Session extends SessionState {
  setUser: (u: User) => void
  auth: {
    authorize: (options?: auth0.AuthorizeOptions) => void
    logout: (options?: auth0.LogoutOptions) => void
  }
}

export const SessionContext = React.createContext<Session>({
  isLoading: true,
  user: AnonymousUser,
  setUser: () => {},
  auth: {
    authorize: () => {},
    logout: () => {},
  },
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
    setSessionState({ isLoading: false, user })
  }

  React.useEffect(() => {
    if (isBrowser && auth.isAuthenticated()) {
      auth.checkSession().then(u => {
        setUser(u)
      })
    }
  }, [])

  return (
    <SessionContext.Provider
      value={{
        ...sessionState,
        setUser,
        auth: {
          authorize: auth.authorize,
          logout: auth.logout,
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
