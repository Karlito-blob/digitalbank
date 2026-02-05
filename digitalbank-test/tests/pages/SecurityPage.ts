import { expect, Locator, Page } from "@playwright/test";

export class SecurityPage {
    readonly page: Page;

    readonly toggle2FA: Locator;
    readonly toggleEmailNotifications: Locator
    readonly toggleSmsNotifications: Locator;
    readonly changePasswordButton: Locator;

    readonly infoUsername: Locator;
    readonly infoEmail: Locator
    readonly infoPhone: Locator;

    readonly inputCurrentPassword: Locator;
    readonly inputNewPassword: Locator
    readonly inputConfirmNewPassword: Locator;
    readonly submitChangePasswordButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.toggle2FA = page.getByTestId('toggle-2fa');
        this.toggleEmailNotifications = page.getByTestId('toggle-email-notifications');
        this.toggleSmsNotifications = page.locator('toggle-sms-notifications');
        this.changePasswordButton = page.getByTestId('btn-change-password');

        this.infoUsername = page.getByTestId('user-name');
        this.infoEmail = page.getByTestId('user-email');
        this.infoPhone = page.getByTestId('user-phone');

        this.inputCurrentPassword = page.getByTestId('input-current-password');
        this.inputNewPassword = page.getByTestId('input-new-password');
        this.inputConfirmNewPassword = page.getByTestId('input-confirm-new-password');
        this.submitChangePasswordButton = page.getByTestId('btn-submit-change-password');
    }

    async switchToggle2FA() {
        await this.toggle2FA.click();
        await expect(this.toggle2FA).toBeChecked();
    }

    async switchToggleEmailNotifications() {
        await this.toggleEmailNotifications.click();
        await expect(this.toggleEmailNotifications).toBeChecked();
    }

    async switchToggleSmsNotifications() {
        await this.toggleSmsNotifications.click();
        await expect(this.toggleSmsNotifications).toBeChecked();
    }

    async changeCurrentPassword(currentPassword: string, newPassword: string) {
        await this.changePasswordButton.click();
        await this.inputCurrentPassword.fill(currentPassword);
        await this.inputNewPassword.fill(newPassword);
        await this.inputConfirmNewPassword.fill(newPassword);
        await this.submitChangePasswordButton.click();
    }

}