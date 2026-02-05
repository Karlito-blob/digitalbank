import { expect, Locator, Page } from "@playwright/test";

export class TransferPage {
    readonly page: Page;
    readonly internalTab: Locator;
    readonly externalTab: Locator;
    readonly addBeneficiaryButton: Locator;
    readonly inputBeneficiaryName: Locator;
    readonly inputBeneficiaryIBAN: Locator
    readonly saveBeneficiaryButton: Locator;
    readonly beneficiariesList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.internalTab = page.getByTestId('btn-transfer-internal');
        this.externalTab = page.getByTestId('btn-transfer-external');

        this.beneficiariesList = page.getByTestId('beneficiary-list');

        this.addBeneficiaryButton = page.getByTestId('btn-add-beneficiary');
        this.inputBeneficiaryName = page.getByTestId('input-beneficiary-name');
        this.inputBeneficiaryIBAN = page.getByTestId('input-beneficiary-iban');
        this.saveBeneficiaryButton = page.getByTestId('btn-save-beneficiary');
    }

    async addNewBeneficiaire(beneficiary : string, iban: string) {
        await this.externalTab.click();
        await this.addBeneficiaryButton.click();
        await this.inputBeneficiaryName.fill(beneficiary);
        await this.inputBeneficiaryIBAN.fill(iban);
        await this.saveBeneficiaryButton.click();
    }

    async checkUserBeneficiaries(beneficiary: string) {
        await expect(this.beneficiariesList).toContainText(beneficiary);
    }
}