import { expect, Locator, Page } from "@playwright/test";

export class ConnexionPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId('input-email');
        this.passwordInput = page.getByTestId('input-password');
        this.loginButton = page.getByTestId('btn-login');
    }

    async navigate() {
        await this.page.goto("/");
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
}