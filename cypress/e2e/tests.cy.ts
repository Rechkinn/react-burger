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
const getUser = "getUser";
const orderNumber = 85282;
const code200 = 200;

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
    cy.intercept("GET", "**/api/auth/user", {
      statusCode: code200,
      body: {
        success: true,
        user: {
          email: "al.red197218@gmail.com",
          name: "Alex",
        },
      },
    }).as(getUser);
    cy.intercept("POST", "**/api/orders", {
      statusCode: code200,
      body: {
        success: true,
        order: {
          number: orderNumber,
        },
      },
    }).as(createOrder);

    cy.setCookie("token", "test-access-token");
    cy.window().then((win: any) => {
      win.localStorage.setItem("refreshToken", "test-refresh-token");
    });
    cy.visit("/react-burger");
    cy.wait(`@${getUser}`);

    cy.dragAndDrop(selectorDataCy(nameBun2), selectorDataCy(bunDrop));
    cy.get(selectorDataCy(bunDrop)).should("contain", nameBun2);

    cy.dragAndDrop(selectorDataCy(nameIngredient2), selectorDataCy(drop));
    cy.get(selectorDataCy(drop)).should("contain", nameIngredient2);

    cy.get(selectorDataCy(confirmOrder)).last().as(confirmOrder);
    cy.get(`@${confirmOrder}`).click();

    cy.wait(`@${createOrder}`).then((interception: any) => {
      expect(interception.response.statusCode).to.equal(code200);

      cy.get(selectorDataCy(textOrderId)).should(
        "contain",
        "идентификатор заказа"
      );
      cy.get(selectorDataCy(textOrderNumber)).should("contain", orderNumber);
    });
    cy.get(selectorDataCy(closeModalIcon)).click();
  });
});
