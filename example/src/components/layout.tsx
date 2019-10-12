import React from "react"
import { SessionContext } from "gatsby-theme-auth0-ts"
import { Header } from "./header"

export const Layout: React.FC = ({ children }) => {
  const session = React.useContext(SessionContext)
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        padding: "20px",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Header />
      <div style={{ flex: "1" }}>{children}</div>
      <div style={{ flex: "0" }}>
        <h3>Current session state</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  )
}
