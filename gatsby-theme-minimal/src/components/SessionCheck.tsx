import React from "react"
import { User, HandleUser, silentAuth } from "../utils/auth0"
import { UserContext } from "./AuthenticationProvider"
import { isBrowser } from "../utils/environment"

export const SessionCheck: React.FC<{ userContext: UserContext }> = ({
  userContext,
  children,
}) => {
  const [loading, setLoading] = React.useState<boolean>(true)

  const handleCheckSession: HandleUser = (user: User) => {
    userContext.setUser(user)
    setLoading(false)
  }

  React.useEffect(() => {
    if (isBrowser) {
      silentAuth(handleCheckSession)
    }
  }, [])

  return loading ? (
    <pre>loading...</pre>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  )
}
