/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add(
  "dragAndDrop",
  (dragSelector: string, dropSelector: string) => {
    cy.get(dragSelector)
      .first()
      .then(($drag) => {
        cy.get(dropSelector)
          .first()
          .then(($drop) => {
            const dragElement = $drag[0];
            const dropElement = $drop[0];

            // Создаём события с правильными координатами
            const dragRect = dragElement.getBoundingClientRect();
            const dropRect = dropElement.getBoundingClientRect();

            const dataTransfer = new DataTransfer();

            // dragstart
            const dragStartEvent = new DragEvent("dragstart", {
              bubbles: true,
              cancelable: true,
              dataTransfer,
              clientX: dragRect.x + dragRect.width / 2,
              clientY: dragRect.y + dragRect.height / 2,
            });
            dragElement.dispatchEvent(dragStartEvent);

            // dragenter
            const dragEnterEvent = new DragEvent("dragenter", {
              bubbles: true,
              cancelable: true,
              dataTransfer,
              clientX: dropRect.x + dropRect.width / 2,
              clientY: dropRect.y + dropRect.height / 2,
            });
            dropElement.dispatchEvent(dragEnterEvent);

            // dragover
            const dragOverEvent = new DragEvent("dragover", {
              bubbles: true,
              cancelable: true,
              dataTransfer,
              clientX: dropRect.x + dropRect.width / 2,
              clientY: dropRect.y + dropRect.height / 2,
            });
            dropElement.dispatchEvent(dragOverEvent);

            // drop
            const dropEvent = new DragEvent("drop", {
              bubbles: true,
              cancelable: true,
              dataTransfer,
              clientX: dropRect.x + dropRect.width / 2,
              clientY: dropRect.y + dropRect.height / 2,
            });
            dropElement.dispatchEvent(dropEvent);

            // dragend
            const dragEndEvent = new DragEvent("dragend", {
              bubbles: true,
              cancelable: true,
              dataTransfer,
            });
            dragElement.dispatchEvent(dragEndEvent);
          });
      });
  }
);

// Типизация для TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      dragAndDrop(dragSelector: string, dropSelector: string): Chainable<void>;
    }
  }
}
