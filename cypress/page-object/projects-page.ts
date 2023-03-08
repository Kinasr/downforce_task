import { Navbar } from "./pages";
import * as projectsData from "@fixtures/projects-data.json";

export class ProjectsPage extends Navbar {
    private subtitle = 'h2'

    /**
     * Ensure that the subtitle tesxt is correct
     */
    public assertThatPageIsOpenedSuccessfully() {
        cy.get(this.subtitle)
            .invoke('text')
            .should('equal', projectsData.subTitle);
    }
}