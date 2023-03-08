import { Navbar } from './pages';
import { parseLastNumberOfString } from 'cypress/support/utility';

export class ProjectPage extends Navbar {
    public static SUB_URL = '/projects/AUS-VIC-002';

    private map = '.map-view-container';
    private vantigeBar = '.side-by-side';
    private vantigeTableRow = 'app-vintage tbody tr';
    private vantigeTableNumOfCredits = '.mat-column-numberOfCredits';
    private vantigeTableStrartRange = '.mat-column-creditRangeStart';
    private vantigeTableEndRange = '.mat-column-creditRangeEnd';

    private totalCreditsText = 'Total Credits';
    private bufferCreditsText = 'Credits in Buffer';
    private availableCreditsText = 'Available Credits';
    private allocatedCreditsText = 'Allocated Credits';
    private retiredCreditsText = 'Retired Credits';

    /**
     * Navigating to the Project page
     * @returns {ProjectPage} a new instance of ProjectPage class
     */
    public static open() {
        cy.visit(this.SUB_URL);
        return new ProjectPage();
    }

    /**
     * Ensure that the map is visible
     */
    public assertThatMapIsVisible() {
        cy.get(this.map).should('be.visible');
    }

    /**
     * Ensure that the Credits in Buffer is equal to 20% of the total Credits
     * 
     * 1. Get the Credits in Buffer text and parse it to Integer
     * 2. Get the Total Credits text and parse it to Integer
     * 3. Assert that the Credits in Buffer are equal to 20% of the total Credits
     */
    public assertThatBufferCreditsIs20OfTotalCredits() {
        let bufferCredits: number;

        cy.getVintageCreditText(this.vantigeBar, this.bufferCreditsText)
            .then(text => bufferCredits = text)
            .getVintageCreditText(this.vantigeBar, this.totalCreditsText)
            .then(text => {
                const totalCredits = parseLastNumberOfString(text);
                expect(bufferCredits).to.equal(totalCredits * 0.2);
            })
    }

    /**
     * Ensure that the Total Credits matches the summition of the credits in each status.
     * 
     * 1. Get the Credits in Buffer text and parse it to Integer
     * 2. Get the Available Credits text and parse it to Integer
     * 3. Get the Allocate Credits text and parse it to Integer
     * 4. Get the Retired Credits text and parse it to Integer
     * 5. Calculate the sum of the credits
     * 6. Assert that the Total Credits equals the sum of the credits
     */
    public assertThatTotalNumberOfCreditsAreCorrect() {
        let bufferCredits: number;
        let availableCredits: number;
        let allocatedCredits: number;
        let retiredCredits: number;

        cy.getVintageCreditText(this.vantigeBar, this.bufferCreditsText)
            .then(text => bufferCredits = parseLastNumberOfString(text))
            .getVintageCreditText(this.vantigeBar, this.availableCreditsText)
            .then(text => availableCredits = parseLastNumberOfString(text))
            .getVintageCreditText(this.vantigeBar, this.allocatedCreditsText)
            .then(text => allocatedCredits = parseLastNumberOfString(text))
            .getVintageCreditText(this.vantigeBar, this.retiredCreditsText)
            .then(text => retiredCredits = parseLastNumberOfString(text))
            .getVintageCreditText(this.vantigeBar, this.totalCreditsText)
            .then(totalCreditsStr => {
                const totalCredits = parseLastNumberOfString(totalCreditsStr);
                expect(totalCredits).to.equal(bufferCredits + availableCredits + allocatedCredits + retiredCredits);
            })
    }

    /**
     * Ensure that the number of Reserved Credits within the Vintage is equal to the sum of credits within all Bundles
     * that have the same status.
     */
    public assertThatReservedCreditsSummitionIsCorrect() {
        this.checkTableCreditsSummition(this.bufferCreditsText, 'Reserved');
    }

    /**
     * Ensure that the number of Allocated Credits within the Vintage is equal to the sum of credits within all Bundles
     * that have the same status.
     */
    public assertThatAllocatedCreditsSummitionIsCorrect() {
        this.checkTableCreditsSummition(this.allocatedCreditsText, 'Allocated');
    }

    /**
     * Ensure that the number of Retired Credits within the Vintage is equal to the sum of credits within all Bundles
     * that have the same status.
     */
    public assertThatRetiredCreditsSummitionIsCorrect() {
        this.checkTableCreditsSummition(this.retiredCreditsText, 'Retired');
    }


    /**
     * Ensure that the Bundle ranges are not overlapping
     * 
     * 1. Select all the bundles rows
     * 2. Get the starting range for each bundle and check that it is greater than the end range of the previous bundle
     * 3. Get the ending range for each bundle and check that it is greater than the start range of the current bundle
     */
    public assertThatTableRangesAreNotOverlapping() {
        let startRange = 0;
        let endRange = 0;

        cy.get(this.vantigeTableRow).each($row => {
            cy.wrap($row).within(() => {
                cy.get(this.vantigeTableStrartRange).invoke('text')
                    .then(range => {
                        const newRange = parseInt(range);
                        expect(newRange).to.be.above(endRange);
                        startRange = newRange;
                    })
                    .get(this.vantigeTableEndRange).invoke('text')
                    .then(range => {
                        const newRange = parseInt(range);
                        expect(newRange).to.be.above(startRange);
                        endRange = newRange;
                    });
            })
        })
    }

    /**
     * Ensure that the number of credits within eacn Bundle is correspond to the Bundle range
     * 
     * 1. Select all the bundles rows
     * 2. Get the number of credits for each bundle
     * 3. Get the start range for each bundle
     * 4. Get the end range for each bundle
     * 5. Assert that the number of credits within the bundle is equal to ((end range - start range) + 1)
     */
    public assertThatRangeMatchesTheNumberOfCredits() {
        cy.get(this.vantigeTableRow).each($row => {
            cy.wrap($row).within(() => {
                let numOfCredits: number;
                let startRange: number;
                let endRange: number;

                cy.get(this.vantigeTableNumOfCredits).invoke('text')
                    .then(number => numOfCredits = parseInt(number))
                    .get(this.vantigeTableStrartRange).invoke('text')
                    .then(range => startRange = parseInt(range))
                    .get(this.vantigeTableEndRange).invoke('text')
                    .then(range => {
                        endRange = parseInt(range);
                        expect(numOfCredits).to.equal((endRange - startRange) + 1);
                    });

            })
        })
    }

    /**
     * Checks that the sum of credits within the Vintage is equal to the sum of credits within all Bundles that have the same status
     * 
     * @param creditName the name of the credit within the Vintage
     * @param creditInTableName the name of the credit within the table
     * 
     * 1. Get the Credit value for this credit within the Vintage
     * 2. Get the table rows that match this credit
     * 3. If the Credit value is equal to 0 assert that there are no rows matching this credit
     * 4. Otherwise, for each row that matches this credit, add the value of the credit within that row to the running total
     * 5. Assert that the Credit value within the Vintage is equal to the credits summition
     */
    private checkTableCreditsSummition(creditName: string, creditInTableName: string) {
        const filter = `:contains("${creditInTableName}")`;

        let credit: number;
        let tableCreditsSummition: number = 0;

        cy.getVintageCreditText(this.vantigeBar, creditName)
            .then(text => {
                credit = parseLastNumberOfString(text);

                let chain = cy.get(this.vantigeTableRow);

                if (credit === 0) {
                    chain.filter(filter)
                        .should('have.length', 0);
                } else {
                    chain.filter(filter)
                        .each($row => {
                            cy.wrap($row).within(() => {
                                cy.get(this.vantigeTableNumOfCredits).invoke('text')
                                    .then(text => tableCreditsSummition += parseInt(text));
                            })
                        })
                        .then(() => expect(tableCreditsSummition).to.equal(credit));
                }
            })
    }


}