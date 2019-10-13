import React from "react"
import { mount } from "enzyme"
import { SessionProvider } from "../../components/SessionProvider"
import Callback from "./callback"
import { navigate } from "gatsby"

jest.mock("gatsby")
jest.mock("../../auth/auth0Service.ts", () => {
  return {
    singleton: {
      handleAuthentication: jest.fn().mockResolvedValue({}),
      isAuthenticated: jest.fn(),
    },
  }
})

describe("callback route", () => {
  xit("does the auth0 callback dance", () => {
    localStorage.setItem("postLoginUrl", "/admin")

    mount(
      <SessionProvider>
        <Callback location={{ hash: "access_token=12345" } as any} />
      </SessionProvider>
    )
    expect(navigate).toHaveBeenCalledWith("/admin")
  })
})
