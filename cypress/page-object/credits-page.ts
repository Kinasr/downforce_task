import { Navbar } from './pages';
import * as creditsData from "@fixtures/credits-data.json";


export class CreditsPage extends Navbar {
    private subtitle = 'h2'

    /**
     * Ensure that the subtitle tesxt is correct
     */
    public assertThatPageIsOpenedSuccessfully() {
        cy.get(this.subtitle)
            .invoke('text')
            .should('equal', creditsData.subTitle);
    }
}