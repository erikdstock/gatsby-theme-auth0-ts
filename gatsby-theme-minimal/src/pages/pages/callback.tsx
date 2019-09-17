import React, { useContext, useEffect } from "react"
import { handleAuthCallback } from "../utils/auth"
import { AuthenticationContext } from "../Components/Authentication"

const Callback = () => {
  const { setUser } = useContext(AuthenticationContext)

  useEffect(() => {
    console.warn("Callback useEffect")
    handleAuthCallback(setUser)
  }, [])

  return <p>Loading...</p>
}

export default Callback
