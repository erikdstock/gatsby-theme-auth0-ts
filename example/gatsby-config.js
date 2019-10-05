require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-auth0",
      options: {
        /* Required */
        auth0Domain: process.env.AUTH0_DOMAIN,
        auth0ClientID: process.env.AUTH0_CLIENT_ID,
        auth0RedirectUri: process.env.AUTH0_CALLBACK_URL
        /* Optional */
        // auth0Audience: "https://{process.env.AUTH0_DOMAIN}/userinfo",
        // auth0ResponseType: "token id_token",
        // auth0Scope: "openid profile",
      }
    }
  ]
};
