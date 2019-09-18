import React, { useContext, useEffect } from "react"
import { navigate } from "gatsby"
import { AuthenticationContext } from "../components"

const Logout = () => {
  const { logout } = useContext(AuthenticationContext)

  useEffect(() => {
    logout()
    navigate("/")
  })

  return <p>Bye Bye</p>
}

export default Logout
