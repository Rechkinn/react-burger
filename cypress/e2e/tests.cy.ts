const selectorDataCy = (nameIngredient: string): string => {
  return `[data-cy="${nameIngredient}"]`;
};

const nameBun1 = "Флюоресцентная булка R2-D3";
const nameBun2 = "Краторная булка N-200i";
const nameIngredient1 = "Соус Spicy-X";
const nameIngredient2 = "Мини-салат Экзо-Плантаго";

const bunDrop = "bunDrop";
const drop = "drop";
const closeModalIcon = "closeModalIcon";
const confirmOrder = "confirmOrder";
const email = "email";
const password = "password";
const submitLogin = "submitLogin";
const login = "login";
const createOrder = "createOrder";
const textOrderId = "textOrderId";
const textOrderNumber = "orderNumber";

describe("testing constructor", () => {
  beforeEach(() => {
    cy.viewport(1440, 1080);
    cy.intercept("GET", "**/api/ingredients").as("getIngredients");
    cy.visit("/react-burger");
    cy.wait("@getIngredients");
  });

  it("dnd", () => {
    cy.get(selectorDataCy(bunDrop)).as(bunDrop);
    cy.dragAndDrop(selectorDataCy(nameBun1), selectorDataCy(bunDrop));
    cy.get(`@${bunDrop}`).should("contain", nameBun1);
    cy.dragAndDrop(selectorDataCy(nameBun2), selectorDataCy(bunDrop));
    cy.get(`@${bunDrop}`).should("contain", nameBun2);

    cy.get(selectorDataCy(drop)).as(drop);
    cy.dragAndDrop(selectorDataCy(nameIngredient1), selectorDataCy(drop));
    cy.get(`@${drop}`).should("contain", nameIngredient1);
    cy.dragAndDrop(selectorDataCy(nameIngredient2), selectorDataCy(drop));
    cy.get(`@${drop}`).should("contain", nameIngredient2);
  });

  it("check-working-ingredient-details-modal", () => {
    cy.get(selectorDataCy(nameBun1)).click();
    cy.get("[data-cy='nameIngredient']").should("contain", nameBun1);
    cy.get("[data-cy='calories']").should("contain", "643");
    cy.get("[data-cy='proteins']").should("contain", "44");
    cy.get("[data-cy='fat']").should("contain", "26");
    cy.get("[data-cy='carbohydrates']").should("contain", "85");
    cy.get(selectorDataCy(closeModalIcon)).click();
  });

  it("confirm-order", () => {
    cy.intercept("POST", "**/api/auth/login").as(login);
    cy.intercept("POST", "**/api/orders").as(createOrder);

    cy.get(selectorDataCy(bunDrop)).as(bunDrop);
    cy.dragAndDrop(selectorDataCy(nameBun1), selectorDataCy(bunDrop));
    cy.get(`@${bunDrop}`).should("contain", nameBun1);
    cy.dragAndDrop(selectorDataCy(nameBun2), selectorDataCy(bunDrop));
    cy.get(`@${bunDrop}`).should("contain", nameBun2);

    cy.get(selectorDataCy(drop)).as(drop);
    cy.dragAndDrop(selectorDataCy(nameIngredient1), selectorDataCy(drop));
    cy.get(`@${drop}`).should("contain", nameIngredient1);
    cy.dragAndDrop(selectorDataCy(nameIngredient2), selectorDataCy(drop));
    cy.get(`@${drop}`).should("contain", nameIngredient2);

    cy.get(selectorDataCy(confirmOrder)).last().as(confirmOrder);

    cy.get(`@${confirmOrder}`).click();
    cy.get("input").first().click().type("al.red197218@gmail.com");
    cy.get("input").last().click().type("1234567890");
    cy.get("button").contains("Войти").click();
    cy.wait(`@${login}`).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(`@${confirmOrder}`).click();
    cy.wait(`@${createOrder}`).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);

      const orderNumber = interception.response.body.order.number;
      cy.get(selectorDataCy(textOrderId)).should(
        "contain",
        "идентификатор заказа"
      );
      cy.get(selectorDataCy(textOrderNumber)).should(
        "contain",
        orderNumber.toString()
      );
    });
    cy.get(selectorDataCy(closeModalIcon)).click();
  });
});
