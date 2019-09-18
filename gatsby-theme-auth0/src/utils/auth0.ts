import auth0, {
  WebAuth,
  Auth0Callback,
  Auth0DecodedHash,
  Auth0UserProfile,
} from "auth0-js"
import { navigate } from "gatsby"
import { isBrowser } from "./environment"

export type HandleUser = (u: User) => void

const auth: WebAuth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.GATSBY_AUTH0_DOMAIN as string,
      clientID: process.env.GATSBY_AUTH0_CLIENTID as string,
      redirectUri: (process.env.GATSBY_APP_URL as string) + "/callback",
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : ({} as WebAuth) // eslint-disable-line

/**
 * Silently check whether the browser storage thinks we are logged in
 * and, if so, reset the auth0 session
 *
 * _Called only by SessionCheck's `useEffect` at boot time_
 * @param cb {HandleUser} what to do with the user when we find them
 */
export const silentAuth = (cb: HandleUser) => {
  if (!isAuthenticated()) {
    return cb(AnonymousUser)
  } else {
    // TODO: verify with auth0 if checkSession() returns same underlying
    // type as parseHash() (it seems to)
    auth.checkSession({}, setSession(cb))
  }
}

/**
 * The useEffect handler for our callback route.
 *
 *  _Called only by Callback page's `useEffect`_
 * @param callback {HandleUser} what to do with the user
 */
export const handleAuthCallback = (callback: HandleUser) => {
  // console.warn("handleAuthCallback", { isBrowser, auth })
  if (isBrowser) {
    auth.parseHash(setSession(callback))
  }
}

/**
 * Use the auth result to set up the user's session
 * in both localStorage and whatever the callback says.
 * @param cb {HandleUser} The callback for the user
 */
const setSession = (cb: HandleUser): Auth0Callback<any> => (
  err,
  authResult
): void => {
  // console.warn("setSession", { err, authResult })
  if (err) {
    navigate("/")
    cb(AnonymousUser)
    return
  }

  const user: User = userFromAuthResult(authResult)
  // console.warn("userFromAuthResult", { user })
  if (isLoggedInUser(user)) {
    setAuthenticated(true)
    navigate("/account")
    cb(user)
  }
}

/**
 * Return whether the user is logged in (according to localStorage)
 * @return {boolean} whether the user is logged in
 */
const isAuthenticated = (): boolean => {
  if (!isBrowser) {
    return false
  }

  return localStorage.getItem("isLoggedIn") === "true"
}

/**
 * Set whether the user is authenticated on localStorage
 * @param authenticated whether or not the user is authenticated
 */
const setAuthenticated = (authenticated: boolean) => {
  console.warn("setAuthenticated", { isBrowser, authenticated })
  if (isBrowser) {
    localStorage.setItem("isLoggedIn", JSON.stringify(authenticated))
  }
}

/**
 * Visit auth0 to begin the login flow
 *
 * _browser-only_
 */
export const login = (...args: any[]) => {
  if (!isBrowser) {
    return
  }

  console.warn("logging in with unused args: ", args)
  auth.authorize({})
}

/**
 * Log out
 *
 */
export const logout = () => {
  setAuthenticated(false)
  auth.logout({ returnTo: process.env.GATSBY_APP_URL as string })
}

const userFromAuthResult = (authResult: Auth0DecodedHash): User => {
  if (
    authResult &&
    authResult.accessToken &&
    authResult.idToken &&
    authResult.expiresIn
  ) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    const tokens: Tokens = {
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      expiresAt,
    }
    const user: LoggedInUser = {
      profile: authResult.idTokenPayload,
      tokens: tokens,
    }
    return user
  } else {
    return AnonymousUser
  }
}

/**
 * Check whether the user is logged in and convert their `User` object
 * into a LoggedInUser
 * @export
 * @param {User} u
 * @returns {u is LoggedInUser}
 */
export function isLoggedInUser(u: User): u is LoggedInUser {
  return typeof u.tokens.accessToken === "string"
}

export type User = LoggedInUser | LoggedOutUser

interface Tokens {
  accessToken?: string
  idToken?: string
  expiresAt?: number
}
export interface LoggedInUser {
  profile: Auth0UserProfile
  tokens: Tokens
}

export const AnonymousUser: LoggedOutUser = {
  profile: null,
  tokens: {},
}

interface LoggedOutUser {
  profile: null
  tokens: Tokens
}
