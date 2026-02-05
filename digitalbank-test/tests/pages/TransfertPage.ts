import { expect, Locator, Page } from "@playwright/test";

export class TransferPage {
    readonly page: Page;
    readonly internalTab: Locator;
    readonly externalTab: Locator;
    readonly addBeneficiaryButton: Locator;
    readonly inputBeneficiaryName: Locator;
    readonly inputBeneficiaryIBAN: Locator
    readonly saveBeneficiaryButton: Locator;
    readonly backToTransferButton: Locator;
    readonly beneficiariesList: Locator;
    readonly selectToAccountDropdown: Locator;
    readonly selectFromAccountDropdown: Locator;
    readonly inputAmount: Locator;
    readonly inputDescription: Locator;
    readonly sumitTransfertButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.internalTab = page.getByTestId('btn-transfer-internal');
        this.externalTab = page.getByTestId('btn-transfer-external');

        this.selectFromAccountDropdown = page.getByTestId('select-from-account');
        this.selectToAccountDropdown = page.getByTestId('select-to-account');
        this.inputAmount = page.getByTestId('input-amount');
        this.inputDescription = page.getByTestId('input-description');
        this.sumitTransfertButton = page.getByTestId('btn-submit-transfer');
        this.backToTransferButton = page.getByTestId('btn-cancel-beneficiary');

        this.beneficiariesList = page.getByTestId('beneficiary-list');
        this.addBeneficiaryButton = page.getByTestId('btn-add-beneficiary');
        this.inputBeneficiaryName = page.getByTestId('input-beneficiary-name');
        this.inputBeneficiaryIBAN = page.getByTestId('input-beneficiary-iban');
        this.saveBeneficiaryButton = page.getByTestId('btn-save-beneficiary');
    }

    async checkFormTransfer() {
        await expect(this.selectFromAccountDropdown).toBeVisible();
        await expect(this.selectToAccountDropdown).toBeVisible();
        await expect(this.inputAmount).toBeVisible();
        await expect(this.inputDescription).toBeVisible();
        await expect(this.sumitTransfertButton).toBeVisible();
    }

    async checkModalBeneficiary() {
        await this.externalTab.click();
        await this.addBeneficiaryButton.click();
        await expect(this.inputBeneficiaryName).toBeVisible();
        await expect(this.inputBeneficiaryIBAN).toBeVisible();
        await expect(this.saveBeneficiaryButton).toBeVisible();
        await expect(this.backToTransferButton).toBeVisible();
        await this.backToTransferButton.click();
        await expect(this.inputBeneficiaryName).not.toBeVisible();
    }

    async virementInterne(fromAccountId: number, toAccountId: number, amount: number, description: string) {
        await this.selectFromAccountDropdown.selectOption({ value: String(fromAccountId) });
        await this.selectToAccountDropdown.selectOption({ value: String(toAccountId) });
        await this.inputAmount.fill(amount.toString());
        await this.inputDescription.fill(description);
        await this.sumitTransfertButton.click();
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

    get successTransfertMessage(): Locator {
        return this.page.getByTestId('transfer-success');
    }

    get errorTransfertMessage(): Locator {
        return this.page.getByTestId('transfer-error');
    }

    get errorBeneficiaryMessage(): Locator {
        return this.page.getByTestId('beneficiary-error');
    }
}