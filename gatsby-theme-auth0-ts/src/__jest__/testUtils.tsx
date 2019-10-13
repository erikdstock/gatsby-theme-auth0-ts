import React from "react"
import auth0 from "auth0-js"
import { SessionContext, Session } from "../components/SessionProvider"

export const getClient = () => {
  return (auth0.WebAuth as jest.Mock).mock.instances[0]
}

export const FakeSessionProvider: React.FC<
  React.ProviderProps<Session>
> = props => {
  return (
    <SessionContext.Provider value={props.value}>
      {props.children}
    </SessionContext.Provider>
  )
}
