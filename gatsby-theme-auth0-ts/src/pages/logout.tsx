import React, { useContext, useEffect } from "react"
import { navigate } from "gatsby"
import { SessionContext } from "../components"

const Logout = () => {
  const { logout } = useContext(SessionContext)

  useEffect(() => {
    logout()
    // navigate("/")
  })

  return <p>Bye Bye</p>
}

export default Logout
