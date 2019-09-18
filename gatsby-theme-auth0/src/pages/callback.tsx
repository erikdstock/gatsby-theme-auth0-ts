import React, { useContext, useEffect } from "react"
import { handleAuthCallback } from "../utils/auth0"
import { AuthenticationContext } from "../components"

const Callback = () => {
  const { setUser } = useContext(AuthenticationContext)

  useEffect(() => {
    console.warn("Callback useEffect")
    handleAuthCallback(setUser)
  }, [])

  return <p>Loading...</p>
}

export default Callback
