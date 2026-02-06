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
    readonly cancelChangePasswordButton: Locator;

    readonly requirements: Locator;
    readonly reqLength: Locator;
    readonly reqUpper: Locator;
    readonly reqLower: Locator;
    readonly reqNumber: Locator;
    readonly reqSpecial: Locator;

    constructor(page: Page) {
        this.page = page;

        this.toggle2FA = page.getByTestId('toggle-2fa');
        this.toggleEmailNotifications = page.getByTestId('toggle-email-notifications');
        this.toggleSmsNotifications = page.getByTestId('toggle-sms-notifications');
        this.changePasswordButton = page.getByTestId('btn-change-password');

        this.infoUsername = page.getByTestId('user-name');
        this.infoEmail = page.getByTestId('user-email');
        this.infoPhone = page.getByTestId('user-phone');

        this.inputCurrentPassword = page.getByTestId('input-current-password');
        this.inputNewPassword = page.getByTestId('input-new-password');
        this.inputConfirmNewPassword = page.getByTestId('input-confirm-password');
        this.submitChangePasswordButton = page.getByTestId('btn-save-password');
        this.cancelChangePasswordButton = page.getByTestId('btn-cancel-password');

        this.requirements = page.getByTestId("password-requirements");
        this.reqLength = page.locator("#req-length");
        this.reqUpper = page.locator("#req-upper");
        this.reqLower = page.locator("#req-lower");
        this.reqNumber = page.locator("#req-number");
        this.reqSpecial = page.locator("#req-special");
    };

    async switchToggle2FA() {
        await this.toggle2FA
            .locator("..")
            .locator(".toggle-slider")
            .click();
    };

    async switchToggleEmailNotifications() {
        await this.toggleEmailNotifications.check();
        await expect(this.toggleEmailNotifications).toBeChecked();
    };

    async switchToggleSmsNotifications() {
        await this.toggleSmsNotifications.check();
        await expect(this.toggleSmsNotifications).toBeChecked();
    };

    async changeCurrentPassword(currentPassword: string, newPassword: string, newPasswordConfirm: string) {
        await this.changePasswordButton.click();
        await this.inputCurrentPassword.fill(currentPassword);
        await this.inputNewPassword.fill(newPassword);
        await this.inputConfirmNewPassword.fill(newPasswordConfirm);
        await this.submitChangePasswordButton.click();
    };

    async verifyTogglesVisible() {
        await expect(this.toggle2FA).toBeVisible();
        await expect(this.toggleEmailNotifications).toBeVisible();
        await expect(this.toggleSmsNotifications).toBeVisible();
    };

    async verifyUserInfo(username: string, email: string, phone: string) {
        await expect(this.infoUsername).toHaveText(username);
        await expect(this.infoEmail).toHaveText(email);
        await expect(this.infoPhone).toHaveText(phone);
    };

    async verifyModalChangePassword() {
        await this.changePasswordButton.click();
        await expect(this.inputCurrentPassword).toBeVisible();
        await expect(this.inputNewPassword).toBeVisible();
        await expect(this.inputConfirmNewPassword).toBeVisible();
        await expect(this.submitChangePasswordButton).toBeVisible();
        await expect(this.cancelChangePasswordButton).toBeVisible();
        await this.cancelChangePasswordButton.click();
        await expect(this.inputCurrentPassword).not.toBeVisible();
    };

    async typeNewPassword(value: string) {
        await this.inputNewPassword.fill(value);
    };

    async expectRequirementsVisible() {
        await expect(this.requirements).toBeVisible();
    };

    async is2FAEnabled(): Promise<boolean> {
        return await this.toggle2FA.isChecked();
    }

    get errorPasswordMessage() {
        return this.page.getByTestId('password-error');
    };

    get successChangePassword() {
        return this.page.getByTestId('security-success')
    };

}