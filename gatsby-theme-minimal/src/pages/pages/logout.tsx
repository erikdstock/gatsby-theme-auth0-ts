import React, { useContext, useEffect } from "react"
import { navigate } from "gatsby"
import { AuthenticationContext } from "../Components/Authentication"

const Logout = () => {
  const { logout } = useContext(AuthenticationContext)

  useEffect(() => {
    logout()
    navigate("/")
  })

  return <p>Bye Bye</p>
}

export default Logout
