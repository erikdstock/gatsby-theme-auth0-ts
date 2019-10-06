import * as React from "react"
import { WindowLocation } from "@reach/router"
import { auth0Service } from "../../auth/auth0Service"
import { Loading } from "../../components/Loading"
import { SessionContext } from "../../components/SessionProvider"
import { navigate } from "gatsby"
import { User } from "../../auth/user"

interface Props {
  location: WindowLocation
}

// TODO: see if we can get this from auth0 login options redirectURI + location bar?
const postLogin = () => {
  const postLoginUrl = localStorage.getItem("postLoginUrl")
  localStorage.removeItem("postLoginUrl")
  navigate(postLoginUrl || "/")
}

const CallbackPage: React.FunctionComponent<Props> = props => {
  const { location } = props

  const session = React.useContext(SessionContext)

  React.useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
      // TODO: put client inside session context rather than importing?
      auth0Service.handleAuthentication().then((user: User) => {
        session.setUser(user)
        postLogin()
      })
    }
  }, [])

  return <Loading />
}

export default CallbackPage
