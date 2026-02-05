import { expect, Locator, Page } from "@playwright/test";

export class ConnexionPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly resetLink: Locator;
    readonly emailresetInput: Locator;
    readonly confirmResetButton: Locator;
    readonly verify2faButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.getByTestId('input-email');
        this.passwordInput = page.getByTestId('input-password');
        this.loginButton = page.getByTestId('btn-login');

        this.verify2faButton = page.getByTestId('btn-verify-2fa');

        this.resetLink = page.getByTestId('link-forgot-password');
        this.emailresetInput = page.getByTestId('input-reset-email');
        this.confirmResetButton = page.getByTestId('btn-reset-password');
    }

    async formIsVisible() {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async fill2FA(twoFACode: string) {
        for (let i = 0; i < twoFACode.length; i++) {
            await this.page.getByTestId(`2fa-code-${i}`).fill(twoFACode[i]);
        }
    }

    async loginWith2FA(email: string, password: string, twoFACode: string) {
        await this.login(email, password);
        await this.fill2FA(twoFACode);
        await this.verify2faButton.click();
    }

    async forgotPassword(email: string) {
        await this.resetLink.click();
        await this.emailresetInput.fill(email);
        await this.confirmResetButton.click();
    }

    get loginErrorMessage(): Locator {
        return this.page.getByTestId('login-error');
    }

    get error2FAMessage(): Locator {
        return this.page.getByTestId('2fa-error');
    }

    get resetSuccessMessage(): Locator {
        return this.page.getByTestId('reset-success');
    }

    get resetErrorResetMessage(): Locator {
        return this.page.getByTestId('reset-error');
    }
}