export const config: auth0.AuthOptions = {
  domain: process.env.AUTH0_DOMAIN as string,
  clientID: process.env.AUTH0_CLIENT_ID as string,
  redirectUri: process.env.AUTH0_CALLBACK_URL as string,
  audience: process.env.AUTH0_AUDIENCE as string,
  responseType: process.env.AUTH0_RESPONSE_TYPE || "token id_token",
  scope: process.env.AUTH0_SCOPE || "openid email profile",
}
