const path = require("path")

exports.onPreBootstrap = ({ reporter }, options) => {
  const { auth0Domain, auth0ClientID, auth0RedirectUri } = options
  console.log(options)
  if (!(auth0ClientID && auth0Domain && auth0RedirectUri)) {
    // TODO: auth0RedirectUri be automatic (to authoDomain/auth/callback)?
    // Should other optional parameters be set to defaults?
    reporter.panicOnBuild(`
        gatsby-theme-auth0-routing requires 'auth0Domain', 'auth0ClientID', and 'auth0RedirectUri' keys.
        If you are loading them from your env you can use this base configuration:
        {
          resolve: "gatsby-theme-auth0",
          options: {
            /* Required */
            auth0Domain: process.env.AUTH0_DOMAIN,
            auth0ClientID: process.env.AUTH0_CLIENT_ID,
            auth0RedirectUri: process.env.AUTH0_CALLBACK_URL 
            /* Optional */
            // auth0Audience: "https://<process.env.AUTH0_DOMAIN>/userinfo",
            // auth0ResponseType: "token id_token",
            // auth0Scope: "openid profile",
          },
        }

        Read the documentation on how to set environment variables locally or in your build tool:
        
        https://www.gatsbyjs.org/docs/environment-variables/
        
        If you're using Netlify to host your website you can also have a look at their documentation:
        
        https://www.netlify.com/docs/continuous-deployment/#environment-variables
      `)
  }
}

exports.onCreateWebpackConfig = ({ plugins, actions }, options) => {
  const {
    auth0Domain,
    auth0ClientID,
    auth0RedirectUri,
    auth0Audience,
    auth0ResponseType,
    auth0Scope,
  } = options

  // checkRequiredCreds({ domain, clientID, redirectUri })

  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        "process.env": {
          AUTH0_DOMAIN: JSON.stringify(auth0Domain),
          AUTH0_CLIENT_ID: JSON.stringify(auth0ClientID),
          AUTH0_CALLBACK_URL: JSON.stringify(auth0RedirectUri),
          AUTH0_AUDIENCE: JSON.stringify(auth0Audience),
          AUTH0_RESPONSE_TYPE: JSON.stringify(auth0ResponseType),
          AUTH0_SCOPE: JSON.stringify(auth0Scope),
        },
      }),
    ],
  })
}

// exports.createPages = ({ actions }, options) => {
//   const { createPage } = actions
//   const { callbackPath } = options

//   createPage({
//     path: callbackPath || "/auth/callback",
//     component: path.resolve(`${__dirname}/src/pages/auth/callback.tsx`),
//   })
// }
