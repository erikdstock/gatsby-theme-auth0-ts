<div style="padding:20px;font-size:120px;color:#5190c9" align="center">
  <a style='font-size:120px' href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" height="80" /></img></a>
  <a style='font-size:120px' href="https://www.auth0.com">
    <img height="75"  alt="auth0" src="./example/src/images/auth0-logo-whitebg.png" /></img></a>
  <a style='font-size:120px' href="https://www.typescriptlang.org">
    <img height="75"  alt="auth0" src="./example/src/images/ts.png" /></img>
  </a>
</div>
<h1 align="center">
  gatsby-theme-auth0-ts

![NPM](https://img.shields.io/npm/l/gatsby-theme-auth0-ts)
![npm](https://img.shields.io/npm/v/gatsby-theme-auth0-ts)
![CircleCI](https://img.shields.io/circleci/build/github/erikdstock/gatsby-theme-auth0-ts/master)

</h1>

## _Gatsby authentication solution._

[![Netlify Status](https://api.netlify.com/api/v1/badges/86f1f840-1a9c-4994-be3e-6c9341cf6d9a/deploy-status)](https://app.netlify.com/sites/gatsby-theme-auth0-ts-example/deploys)  
_See example site deployed at [gatsby-theme-auth0-ts-example.netlify.com](https://gatsby-theme-auth0-ts-example.netlify.com)._

_[Jump to comparison with `gatsby-theme-auth0`](#comparison-with-gatsby-theme-auth0)_

### Features

- Easy set up; simply set up your ENV with values from your Auth0 application.
- Full typescript support
- Routing with `<PrivateRoute />`
- Access session and auth utilities via the React Context API (`SessionContext`)

### Setup

_This setup assumes you are using `yarn` and `dotenv`. See the [demo app](./example) for more details_

1. Create an auth0 'Single Page Web App' application for your site and configure the auth0 application. An example for development running at `http://localhost:8000`:

- Add `http://localhost:8000/auth/callback` to the **Allowed Callback URLs** field.
- Add `http://localhost:8000` to **Allowed Web Origins** and **Allowed Logout URLs**.

2. Add this package to your gatsby site dependencies: `yarn add gatsby-theme-auth0-ts`
3. Add the theme to your `gatsby-config`. Environment variables should be filled in from the auth0 app you created.

```
### .env.development

# ~ Make sure to add me to your .gitignore ~

# Required for Auth0
AUTH0_DOMAIN=<FILL IN FROM YOUR AUTH0 APPLICATION>
AUTH0_CLIENT_ID=<FILL IN FROM YOUR AUTH0 APPLICATION>
AUTH0_CALLBACK_URL=http://localhost:8000/auth/callback

# Optional
AUTH0_AUDIENCE=
AUTH0_RESPONSE_TYPE=
AUTH0_SCOPE=
```

```js
// gatsby-config.js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Gatsby + Auth0 + Ts",
  },
  plugins: [
    {
      resolve: "gatsby-theme-auth0-ts",
      options: {
        /*
        Required: for more information on these values
        see https://auth0.com/docs/libraries/auth0js/v9#initialization
        */
        auth0Domain: process.env.AUTH0_DOMAIN,
        auth0ClientID: process.env.AUTH0_CLIENT_ID,
        auth0RedirectUri: process.env.AUTH0_CALLBACK_URL,

        /* Optional */
        // auth0Audience: undefined,
        // auth0ResponseType: "token id_token",
        // auth0Scope: "openid profile",
      },
    },
  ],
}
```

4. Begin creating your app. The Example App shows off some of what you can do:

- Programatically create authenticated-only pages: see [gatsby-node](./example/gatsby-node.js) and the [account page](./example/src/pages/account.tsx). `<PrivateRoute component={MyRoute} />` accepts a [`@reach/router` RouteComponent](https://reach.tech/router/api/RouteComponent) which will receive and additional `user` prop (or redirect to the authentication flow if the user is not logged in). `@reach/router` is used by Gatsby's routing layer so ready to go.
- Access the user + session state directly via the React context api: see the [Header](./example/src/components/header.tsx) component.

### Usage

#### `User` _[(source)](src/auth/user.ts)_

A `User` object can be either a `LoggedInUser` or a `LoggedOutUser`.

#### `<PrivateRoute />` _[(source)](src/components/PrivateRoute.tsx)_

The `PrivateRoute` [source](src/components/PrivateRoute.tsx) component is intended to be used within the context of `@reach/router`. It wraps the internal `component` prop and passes in a `user` (`LoggedInUser`) prop as well. If the user is not logged in `PrivateRoute` will redirect them to the authentication flow.

```tsx
import { PrivateRoute, PrivateRouteComponent } from "gatsby-theme-auth0-ts"

const Home: PrivateRouteComponent = ({ user }) => {
  return <p>Hi, {user.profile.nickname ? user.profile.nickname : "friend"}!</p>
}

const Account = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute component={Home} path="/account" />
        {/* ET CETERA */}
        <PrivateRoute component={Settings} path="/account/settings" />
      </Router>
    </Layout>
  )
}
```

#### `SessionContext` [(source)](src/components/SessionProvider.tsx)

The `SessionContext` is a React Context which provides a `Session` object containing (in particular) a `user` and an `auth` object with helpers for triggering the login and logout flows:

```tsx
import { SessionContext } from "gatsby-theme-auth0-ts"

const LoginOrOut = () => {
  const session = React.useContext(SessionContext)
  const { auth } = session

  return user.isLoggedIn ? (
    <button onClick={() => auth.logout()}>Log Out</button>
  ) : (
    <button onClick={() => auth.authorize()}>Log In</button>
  )
}
```

### Contributing

Issues and Pull requests accepted. Contributors must abide by the [Contributor Covenant CoC](./code-of-conduct.md).

#### Contributors

@erikdstock

### Comparison with `gatsby-theme-auth0`

[epilande/gatsby-theme-auth0](https://github.com/epilande/gatsby-theme-auth0) is another approach to combining gatsby and auth0 developed independently of this package. Both provide typescript support and use a similar auth0 configuration. They differ in that:

- This package uses the `<PrivateRoute />` component as the _primary method_ of triggering the authentication flow.
- This package exposes session information via the `SessionContext` (i.e. `React.useContext(SessionContext)`)
- `epilande/gatsby-theme-auth0` handles authentication primarily via a custom react hook.

### Credits/See Also:

- [Securing Gatsby with Auth0](https://auth0.com/blog/securing-gatsby-with-auth0/) and [this youtube video featuring @kukicado and @jlengstorf](https://www.youtube.com/watch?v=j-vuF2PYHmU) inspired this theme's initial structure.
