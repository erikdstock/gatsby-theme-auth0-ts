describe("app", () => {
  it("loads", () => {
    cy.visit("/").findByText(/"isLoggedIn": false/i)
  })
})
