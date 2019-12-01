import { browser, by, element, Key } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getAddButton() {
        return element(by.xpath('/html/body/app-root/div/div[1]/div[3]/button')).getText() as Promise<string>;
    }

    clickAddButton() {
        return element(by.xpath('/html/body/app-root/div/div[1]/div[3]/button')).click();
    }

    clickNthFilterFieldSelector(n: number) {
        return element(
            by.xpath(`/html/body/app-root/div/div[1]/div[2]/div[${n}]/app-filter/div/div[1]/mat-select`),
        ).click();
        // /html/body/app-root/div/div[1]/div[2]/div/app-filter/div/div[2]/mat-select
    }

    clickNthFilterOperatorSelector(n: number) {
        return element(
            by.xpath(`/html/body/app-root/div/div[1]/div[2]/div[${n}]/app-filter/div/div[2]/mat-select`),
        ).click();
    }

    clickNthFilterRHSSelector(n: number) {
        return element(
            by.xpath(`/html/body/app-root/div/div[1]/div[2]/div[${n}]/app-filter/div/div[3]/button`),
        ).click();
    }

    selectNthMaterialOption(n: number) {
        return element(by.xpath(`/html/body/div[2]/div[2]/div/div/div/mat-option[${n}]`)).click();
    }

    getNthFilter(n: number) {
        return element(by.xpath(`/html/body/app-root/div/div[1]/div[2]/div[${n}]`));
    }

    getApplyButton() {
        return element(by.xpath('/html/body/app-root/div/div[2]/button')).getText() as Promise<string>;
    }

    addSuggestionAndSelect(n: number, value: any) {
        const input = element(
            by.xpath(
                `/html/body/app-root/div/div[1]/div[2]/div[${n}]/app-filter/div/div[3]/div/div/app-input-widget/input`,
            ),
        );
        input.click();
        input.sendKeys(value);
        input.sendKeys(Key.ENTER);
    }

    enterInput(n: number, value: any) {
        const input = element(
            by.xpath(
                `/html/body/app-root/div/div[1]/div[2]/div[${n}]/app-filter/div/div[3]/div/div/app-input-widget/input`,
            ),
        );
        input.click();
        input.sendKeys(value);
        input.sendKeys(Key.ENTER);
    }

    selectNthRHS(filterNumber: number, option: number) {
        const xpath = `/html/body/app-root/div/div[1]/div[2]/div[${filterNumber}]/app-filter/div/div[3]/div/div/div[2]/cdk-virtual-scroll-viewport/div[1]/mat-selection-list/mat-list-option[${option}]`;
        const optionElement = element(by.xpath(xpath));
        optionElement.click();
    }

    clickApply(n: number) {
        const xpath = `/html/body/app-root/div/div[1]/div[2]/div[${n}]/app-filter/div/div[3]/div/div/div[2]/div/button`;
        const applyElement = element(by.xpath(xpath));
        applyElement.click();
    }
}
