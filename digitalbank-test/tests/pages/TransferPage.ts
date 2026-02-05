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
    readonly selectToAccountDropdown: Locator;
    readonly selectFromAccountDropdown: Locator;
    readonly inputAmount: Locator;
    readonly inputDescription: Locator;
    readonly sumitTransferButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.internalTab = page.getByTestId('btn-transfer-internal');
        this.externalTab = page.getByTestId('btn-transfer-external');

        this.selectFromAccountDropdown = page.getByTestId('select-from-account');
        this.selectToAccountDropdown = page.getByTestId('select-to-account');
        this.inputAmount = page.getByTestId('input-amount');
        this.inputDescription = page.getByTestId('input-description');
        this.sumitTransferButton = page.getByTestId('btn-submit-transfer');

        this.beneficiariesList = page.getByTestId('beneficiary-list');
        this.addBeneficiaryButton = page.getByTestId('btn-add-beneficiary');
        this.inputBeneficiaryName = page.getByTestId('input-beneficiary-name');
        this.inputBeneficiaryIBAN = page.getByTestId('input-beneficiary-iban');
        this.saveBeneficiaryButton = page.getByTestId('btn-save-beneficiary');
    }

    async virementInterne(fromAccountId: number, toAccountId: number, amount: number, description: string) {
        await this.selectFromAccountDropdown.selectOption({ value: String(fromAccountId) });
        await this.selectToAccountDropdown.selectOption({ value: String(toAccountId) });
        await this.inputAmount.fill(amount.toString());
        await this.inputDescription.fill(description);
        await this.sumitTransferButton.click();
    }

    async addNewBeneficiaire(beneficiary: string, iban: string) {
        await this.externalTab.click();
        await this.addBeneficiaryButton.click();
        await this.inputBeneficiaryName.fill(beneficiary);
        await this.inputBeneficiaryIBAN.fill(iban);
        await this.saveBeneficiaryButton.click();
    }

    async checkUserBeneficiaries(beneficiary: string) {
        await expect(this.beneficiariesList).toContainText(beneficiary);
    }

    get successMessage(): Locator {
        return this.page.getByTestId('transfer-success');
    }

    get errorMessage(): Locator {
        return this.page.getByTestId('transfer-error');
    }
}