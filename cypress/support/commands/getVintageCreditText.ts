export { }

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Get the text of a Vintage credit based on Vintage bar locator and part of the credit text.
             * @param barLocator the locator of the Vintaage bar
             * @param creditText the known part to the credit text
             */
            getVintageCreditText(barLocator: string, creditText: string): Chainable<any>
        }
    }
}

Cypress.Commands.add('getVintageCreditText', (barLocator: string, creditText: string) => {
    return cy.get(barLocator)
        .contains(creditText)
        .invoke('text').then((t) => t);
})