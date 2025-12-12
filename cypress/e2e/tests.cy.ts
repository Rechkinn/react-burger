describe("testing constructor", () => {
  beforeEach(() => {
    cy.viewport(1440, 1080);
    cy.intercept(
      "GET",
      "https://norma.education-services.ru/api/ingredients"
    ).as("getIngredients");
    cy.visit("/");
    cy.wait("@getIngredients");
  });

  it("dnd", () => {
    cy.dragAndDrop("[alt='Флюоресцентная булка R2-D3']", "[class^=bun-drop]");
    cy.get("[class^=bun-drop]").should("contain", "Флюоресцентная булка R2-D3");
    cy.dragAndDrop("[alt='Краторная булка N-200i']", "[class^=bun-drop]");
    cy.get("[class^=bun-drop]").should("contain", "Краторная булка N-200i");
    cy.dragAndDrop("[alt='Соус Spicy-X']", "[class^=drop]");
    cy.get("[class^=drop]").should("contain", "Соус Spicy-X");
    cy.dragAndDrop("[alt='Мини-салат Экзо-Плантаго']", "[class^=drop]");
    cy.get("[class^=drop]").should("contain", "Мини-салат Экзо-Плантаго");
  });

  it("check-working-ingredient-details-modal", () => {
    cy.get("[alt='Флюоресцентная булка R2-D3']").click();
    cy.get("[class^='nameIngredient']").should(
      "contain",
      "Флюоресцентная булка R2-D3"
    );
    cy.get("[class^='calories']").should("contain", "643");
    cy.get("[class^='proteins']").should("contain", "44");
    cy.get("[class^='fat']").should("contain", "26");
    cy.get("[class^='carbohydrates']").should("contain", "85");
    cy.get("[class^=closeModalIcon]").click();
  });

  it("confirm-order", () => {
    cy.dragAndDrop("[alt='Флюоресцентная булка R2-D3']", "[class^=bun-drop]");
    cy.get("[class^=bun-drop]").should("contain", "Флюоресцентная булка R2-D3");
    cy.dragAndDrop("[alt='Краторная булка N-200i']", "[class^=bun-drop]");
    cy.get("[class^=bun-drop]").should("contain", "Краторная булка N-200i");
    cy.dragAndDrop("[alt='Соус Spicy-X']", "[class^=drop]");
    cy.get("[class^=drop]").should("contain", "Соус Spicy-X");
    cy.dragAndDrop("[alt='Мини-салат Экзо-Плантаго']", "[class^=drop]");
    cy.get("[class^=drop]").should("contain", "Мини-салат Экзо-Плантаго");
    cy.get("button").contains("Оформить заказ").click();
    cy.get("input").first().click().type("al.red197218@gmail.com");
    cy.get("input").last().click().type("1234567890");
    cy.get("button").contains("Войти").click();
    cy.get("button").contains("Оформить заказ").click();
    cy.wait(16000);
    cy.get("p").should("contain", "идентификатор заказа");
    cy.get("[class^=closeModalIcon]").click();
  });
});
