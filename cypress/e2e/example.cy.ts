describe("Synpress Demo With GitLab CI/CD", () => {
  it("should connect to MetaMask and display wallet address", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#address").contains("??");
    cy.get("#connect-btn").click();
    cy.acceptMetamaskAccess();

    cy.wait(10000);

    cy.get("#address").contains("0xe985ef3c939de33f979283d486743475a93e8eac");
    // cy.get("#connected").contains("YES");

    // cy.get("#disconnect-btn").click();
    // cy.get("#address").contains("??");
    // cy.get("#connected").contains("NO");
  });
});
