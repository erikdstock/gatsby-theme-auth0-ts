import React, { useContext, useEffect } from "react"
import { SessionContext } from "../../../gatsby-theme-auth0-ts/src/components"

const Logout = () => {
  const { logout } = useContext(SessionContext)

  useEffect(() => {
    logout()
  })

  return <p>Bye Bye</p>
}

export default Logout
