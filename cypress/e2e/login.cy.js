import { apiPath } from "../../src/js/api/constants";

describe("login functionality", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("logs in successfully with valid credentials", () => {
    cy.intercept("POST", `${apiPath}/social/auth/login`).as("loginAttempt");

    cy.get("#loginEmail").type("usertest@noroff.no");
    cy.get("#loginPassword").type("usertest123");
    cy.get("#loginForm").submit();

    cy.wait("@loginAttempt");
  });
});
