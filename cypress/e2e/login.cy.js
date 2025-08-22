//test
const goodEmail = "test@example.com";
const badEmail  = "testexample.com";
const goodPwd   = "Aa123456!";
const badPwd    = "12345";

describe("Login Formu", () => {
  beforeEach(() => cy.visit("/"));

  it("Başarılı form doldurulunca submit ve success", () => {
    cy.get('[data-cy="email-input"]').type(goodEmail);
    cy.get('[data-cy="password-input"]').type(goodPwd);
    cy.get('[data-cy="terms-checkbox"]').check();

    cy.get('[data-cy="submit-btn"]').should("not.be.disabled").click();
    cy.location("pathname").should("eq", "/success");
    cy.get('[data-cy="success-title"]').should("contain", "Giriş başarılı");
  });

  it("Hatalı durumlarda doğru hata mesajları ve disabled buton", () => {
    // 1) email yanlış, diğerleri doğru
    cy.get('[data-cy="email-input"]').type(badEmail).blur();
    cy.get('[data-cy="password-input"]').type(goodPwd).blur();
    cy.get('[data-cy="terms-checkbox"]').check().blur();

    cy.get('[data-cy="error"]').should("have.length", 1);
    cy.contains('[data-cy="error"]', "Geçerli bir e-posta").should("exist");
    cy.get('[data-cy="submit-btn"]').should("be.disabled");

    // 2) email ve password yanlış
    cy.get('[data-cy="password-input"]').clear().type(badPwd).blur();
    cy.get('[data-cy="error"]').should("have.length", 2);
    cy.contains('[data-cy="error"]', "Şifre en az 8 karakter").should("exist");
    cy.get('[data-cy="submit-btn"]').should("be.disabled");

    // 3) email ve password doğru ama kurallar işaretli değil
    cy.get('[data-cy="email-input"]').clear().type(goodEmail).blur();
    cy.get('[data-cy="password-input"]').clear().type(goodPwd).blur();
    cy.get('[data-cy="terms-checkbox"]').uncheck().blur();
    cy.get('[data-cy="submit-btn"]').should("be.disabled");
  });

});
