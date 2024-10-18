import { apiPath } from "../../src/js/api/constants";

describe("logout functionality", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("logs out successfully", () => {
    cy.intercept("POST", `${apiPath}/social/auth/login`).as("loginAttempt");

    cy.get("#loginEmail").type("usertest@noroff.no");
    cy.get("#loginPassword").type("usertest123");
    cy.get("#loginForm").submit();

    cy.wait("@loginAttempt");

    cy.window().then((window) => {
      expect(window.localStorage.getItem("token")).to.exist;
    });

    cy.get("[data-auth='logout']").click();

    cy.window().then((window) => {
      expect(window.localStorage.getItem("token")).to.be.null;
    });
  });
});
