import React from "react"
import { Layout } from "../components/layout"

export default () => {
  return (
    <Layout>
      <h2>Home</h2>
      <pre>
        <h3>Auth0 Login Credentials:</h3>
        User: example@test.com
        <br />
        Password: Password123
      </pre>
    </Layout>
  )
}
