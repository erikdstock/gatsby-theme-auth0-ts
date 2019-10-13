import React from "react"
import { mount } from "enzyme"
import { SessionProvider, Session } from "./SessionProvider"
import { PrivateRoute } from "./PrivateRoute"
import { Auth0UserProfile } from "auth0-js"
import { FakeSessionProvider, getClient } from "../__jest__/testUtils"

describe("<PrivateRoute />", () => {
  it("redirects an anonymous user to login", () => {
    const wrapper = mount(
      <SessionProvider>
        <PrivateRoute
          component={props => {
            return <div>Hello {props.user.profile.nickname}</div>
          }}
        />
      </SessionProvider>
    )

    expect(getClient().authorize).toHaveBeenCalledWith({})
    expect(wrapper.text()).toMatch("Redirecting to login...")
  })

  it("renders the component for a logged-in user", () => {
    const sessionContext: Session = {
      setUser: jest.fn(),
      auth: {} as any,
      isLoading: false,
      user: {
        isLoggedIn: true,
        profile: { nickname: "jeffery" } as Auth0UserProfile,
        tokens: {
          accessToken: "please",
          expiresAt: Date.now() + 10000,
          idToken: "jeff",
        },
      },
    }

    const wrapper = mount(
      <FakeSessionProvider value={sessionContext}>
        <PrivateRoute
          component={props => {
            return <div>Hello {props.user.profile.nickname}</div>
          }}
        />
      </FakeSessionProvider>
    )

    expect(wrapper.text()).toMatch("Hello jeffery")
  })
})
