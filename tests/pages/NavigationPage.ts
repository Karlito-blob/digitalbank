import { expect, Locator, Page } from "@playwright/test";

export class NavigationPage {
    readonly page: Page;
    readonly dashboardTab: Locator;
    readonly transferTab: Locator;
    readonly billsTab: Locator;
    readonly securityTab: Locator;
    readonly logoutButton: Locator;
    readonly contentLogin: Locator;
    readonly contentDashboard: Locator
    readonly contentTransfer: Locator;
    readonly contentBills: Locator
    readonly contentSecurity: Locator;

    constructor(page: Page) {
        this.page = page;

        this.dashboardTab = page.getByTestId('tab-dashboard');
        this.transferTab = page.getByTestId('tab-transfer');
        this.billsTab = page.getByTestId('tab-bills');
        this.securityTab = page.getByTestId('tab-security');
        this.logoutButton = page.getByTestId('btn-logout');

        this.contentLogin = page.locator('#login-form');
        this.contentDashboard = page.getByTestId('balance-cards');
        this.contentTransfer = page.locator('#transfer-form');
        this.contentBills = page.getByTestId('pending-bills');
        this.contentSecurity = page.getByTestId('2fa-toggle-group');
    }

    async navigateToLogin() {
        await this.page.goto("/");
        await expect(this.contentLogin).toBeVisible();
    }

    async navigateToDashboard() {
        await this.dashboardTab.click();
        await expect(this.contentDashboard).toBeVisible();
    }

    async navigateToTransfer() {
        await this.transferTab.click();
        await expect(this.contentTransfer).toBeVisible();
    }

    async navigateToBills() {
        await this.billsTab.click();
        await expect(this.contentBills).toBeVisible();
    }

    async navigateToSecurityPage() {
        await this.securityTab.click();
        await expect(this.contentSecurity).toBeVisible();
    }

    async logout() {
        await this.logoutButton.click();
        await expect(this.contentLogin).toBeVisible();
    }
}