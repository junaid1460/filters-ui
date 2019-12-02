import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Add button should be there', () => {
        page.navigateTo();
        expect(page.getAddButton()).toEqual('+ ADD');
    });

    it('Add button should be there', () => {
        page.navigateTo();
        expect(page.getApplyButton()).toEqual('APPLY');
    });

    it('Clicking add should add one more filter', () => {
        const timegap = 250;
        let filter = 1;
        page.navigateTo();
        browser.sleep(timegap);
        page.clickAddButton();
        browser.sleep(timegap);
        page.clickNthFilterFieldSelector(1);
        browser.sleep(timegap);
        page.selectNthMaterialOption(1);
        browser.sleep(timegap);
        page.clickNthFilterOperatorSelector(1);
        browser.sleep(timegap);
        page.selectNthMaterialOption(1);
        browser.sleep(timegap);
        page.clickNthFilterRHSSelector(1);
        browser.sleep(timegap);
        page.addSuggestionAndSelect(1, 10233);
        browser.sleep(timegap);
        page.selectNthRHS(1, 2);
        browser.sleep(timegap);
        page.clickApply(1);
        browser.sleep(timegap);

        page.clickNthFilterFieldSelector(2);
        browser.sleep(timegap);
        page.selectNthMaterialOption(2);
        browser.sleep(timegap);
        page.clickNthFilterOperatorSelector(2);
        browser.sleep(timegap);
        page.selectNthMaterialOption(2);
        browser.sleep(timegap);
        page.clickNthFilterRHSSelector(2);
        browser.sleep(timegap);
        page.addSuggestionAndSelect(2, 10233);
        browser.sleep(timegap);
        page.selectNthRHS(2, 1);
        browser.sleep(timegap);
        page.clickApply(2);

        browser.sleep(timegap);
        page.clickAddButton();

        filter = 3;
        page.clickNthFilterFieldSelector(filter);
        browser.sleep(timegap);
        page.selectNthMaterialOption(1);
        browser.sleep(timegap);
        page.clickNthFilterOperatorSelector(filter);
        browser.sleep(timegap);
        page.selectNthMaterialOption(1);
        browser.sleep(timegap);
        page.clickNthFilterRHSSelector(filter);
        browser.sleep(timegap);
        page.selectNthRHS(filter, 1);
        browser.sleep(timegap);
        page.clickApply(filter);

        browser.sleep(timegap);
        page.clickAddButton();

        filter = 4;
        page.clickNthFilterFieldSelector(filter);
        browser.sleep(timegap);
        page.selectNthMaterialOption(3);
        browser.sleep(timegap);
        page.clickNthFilterOperatorSelector(filter);
        browser.sleep(timegap);
        page.selectNthMaterialOption(1);
        browser.sleep(timegap);
        page.clickNthFilterRHSSelector(filter);
        browser.sleep(timegap);
        page.enterInput(filter, 'Hello');

        browser.sleep(timegap);
        page.clickAddButton();
        filter = 5;
        page.clickNthFilterFieldSelector(filter);
        browser.sleep(timegap);
        page.selectNthMaterialOption(4);
        browser.sleep(timegap);
        page.clickNthFilterOperatorSelector(filter);
        browser.sleep(timegap);
        page.selectNthMaterialOption(1);
        browser.sleep(timegap);
        page.clickNthFilterRHSSelector(filter);
        browser.sleep(timegap);
        page.enterInput(filter, 2);

        page.clickMainApplyButton();
        browser.sleep(3000);

        expect(page.getNthFilter(2)).not.toBeNull();
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser
            .manage()
            .logs()
            .get(logging.Type.BROWSER);
        expect(logs).not.toContain(
            jasmine.objectContaining({
                level: logging.Level.SEVERE,
            } as logging.Entry),
        );
    });
});
