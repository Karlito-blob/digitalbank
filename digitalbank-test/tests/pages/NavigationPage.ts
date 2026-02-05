import { expect, Locator, Page } from "@playwright/test";

export class NavigationPage {
    readonly page: Page;
    readonly dashboardTab: Locator;
    readonly transferTab: Locator;
    readonly billsTab: Locator;
    readonly securityTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardTab = page.getByTestId('tab-dashboard');
        this.transferTab = page.getByTestId('tab-transfer');
        this.billsTab = page.getByTestId('tab-bills');
        this.securityTab = page.getByTestId('tab-security');
    }

    async navigateToLogin() {
        await this.page.goto("/");
    }

    async navigateToDashboard() {
        await this.dashboardTab.click();
    }

    async navigateToTransfer() {
        await this.transferTab.click();
    }

    async navigateToBills() {
        await this.billsTab.click();
    }

    async navigateToSecurityPage() {
        await this.securityTab.click();
    }
}