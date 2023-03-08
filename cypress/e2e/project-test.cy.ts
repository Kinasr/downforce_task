import { ProjectPage } from '../page-object/pages';


describe('Carbon Registry Project Test', () => {
    it('NV001 - Open the Project page', () => {
        ProjectPage.open()
            .assertThatTitleIsCorrect();
    });

    it('NV002 - Click on Projects button in the navbar', () => {
        ProjectPage.open()
            .clickOnProjectsButton()
            .assertThatPageIsOpenedSuccessfully();
    });

    it('NV003 - Click on Credits buttonin the navbar', () => {
        ProjectPage.open()
            .clickOnCreditsButton()
            .assertThatPageIsOpenedSuccessfully();
    });

    it('MP001 - Verify that the Map is present on the Project page', () => {
        ProjectPage.open()
            .assertThatMapIsVisible();
    });

    it('VNTG001 - Calculate the percentage of credits in buffer/reserved compared to the total credits', () => {
        ProjectPage.open()
            .assertThatBufferCreditsIs20OfTotalCredits();
    });

    it('VNTG002 - Vintage Credits Total Should Match the Sum of Credits in Each Status', () => {
        ProjectPage.open()
            .assertThatTotalNumberOfCreditsAreCorrect();
    });

    it('VNTG003 - Reserved Credits Consistency Across Vintage and Bundles', () => {
        ProjectPage.open()
            .assertThatReservedCreditsSummitionIsCorrect();
    });

    it('VNTG004 - Allocated Credits Consistency Across Vintage and Bundles', () => {
        ProjectPage.open()
            .assertThatAllocatedCreditsSummitionIsCorrect();
    });

    it('VNTG005 - Retired Credits Consistency Across Vintage and Bundles', () => {
        ProjectPage.open()
            .assertThatRetiredCreditsSummitionIsCorrect();
    });

    it('VNTG006 - Credit Bundle Ranges Should Not Overlap', () => {
        ProjectPage.open()
            .assertThatTableRangesAreNotOverlapping();
    });

    it('VNTG007 - Credit Count Consistency with Bundle Range in Each Bundle', () => {
        ProjectPage.open()
            .assertThatRangeMatchesTheNumberOfCredits();
    });
});