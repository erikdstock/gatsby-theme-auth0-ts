import React from "react"
import { User, AnonymousUser } from "../auth/user"
import { GatsbyBrowser } from "gatsby"
import { singleton as auth, Auth0Service } from "../auth/auth0Service"
import { isBrowser } from "../utils/environment"

// TODO: consider combining
interface SessionState {
  isLoading: boolean
  user: User
}

export interface Session extends SessionState {
  setUser: (u: User) => void
  auth: Auth0Service
}

export const SessionContext = React.createContext<Session>({
  isLoading: true,
  user: AnonymousUser,
  setUser: () => {},
  auth: auth,
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
        auth,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
