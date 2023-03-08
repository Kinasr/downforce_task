import { ProjectsPage, CreditsPage } from './pages';
import * as navbarData from '@fixtures/navbar-data.json';

export class Navbar {
    private title = '.title';
    private buttonProjects = ".navbar-buttons a[href='/projects']";
    private buttonCredits = ".navbar-buttons a[href='/credits']";

    /**
     * Clicking on the Projects button in the Navbar
     * @returns {ProjectsPage} new instance of ProjectPage
     */
    public clickOnProjectsButton() {
        cy.get(this.buttonProjects).click();
        return new ProjectsPage();
    }

    /**
     * Clicking on the Credits button in the Navbar
     * @returns {CreditsPage} new instance of CreditsPage
     */
    public clickOnCreditsButton() {
        cy.get(this.buttonCredits).click();
        return new CreditsPage();
    }

    /**
     * Ensure that the page title is correct
     */
    public assertThatTitleIsCorrect() {
        cy.get(this.title).should('contain', navbarData.title);
    }
}