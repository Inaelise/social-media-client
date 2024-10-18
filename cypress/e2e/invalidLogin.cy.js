import { apiPath } from "../../src/js/api/constants";

describe("login functionality", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("does not log in with invalid credentials and shows an error message", () => {
    cy.intercept("POST", `${apiPath}/social/auth/login`, {
      statusCode: 401,
      body: {
        message:
          "Either your username was not found or your password is incorrect",
      },
    }).as("loginAttempt");

    cy.on("window:alert", (string) => {
      expect(string).to.equal(
        "Either your username was not found or your password is incorrect",
      );
    });

    cy.get("#loginEmail").type("invalidtest@noroff.no");
    cy.get("#loginPassword").type("invaliduser123");
    cy.get("#loginForm").submit();

    cy.wait("@loginAttempt").its("response.statusCode").should("eq", 401);
  });
});
