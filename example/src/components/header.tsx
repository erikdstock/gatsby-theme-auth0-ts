import React from "react"
import { SessionContext } from "gatsby-theme-auth0-ts"
import { Link } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

export const Header = () => {
  const session = React.useContext(SessionContext)

  const {
    user,
    auth: { authorize, logout },
  } = session
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <h1>{data.site.siteMetadata.title}</h1>
      </Link>
      <nav>
        {user.isLoggedIn ? (
          <>
            <Link style={{ color: "black" }} to="/account">
              Account
            </Link>{" "}
            <Link style={{ color: "black" }} to="/account/settings">
              Settings
            </Link>{" "}
            <Link style={{ color: "black" }} to="/account/billing">
              Billing
            </Link>{" "}
            <button
              style={{
                color: "black",
                border: "1px solid black",
                borderRadius: "3px",
              }}
              onClick={() => logout()}
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            style={{
              color: "black",
              border: "1px solid black",
              borderRadius: "3px",
            }}
            onClick={() => authorize()}
          >
            Log In
          </button>
        )}
      </nav>
    </header>
  )
}
