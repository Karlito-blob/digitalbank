import { expect, Locator, Page } from "@playwright/test";

type AccountFixture = {
    readonly id: number;
    readonly type: string;
    readonly number: string;
    readonly balance: number;
};

export class DashboardPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly balanceCards: Locator;
    readonly transactionCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByTestId('btn-logout');
        this.balanceCards = page.getByTestId('balance-cards');
        this.transactionCards = page.getByTestId('transaction-list');
    }

    async welcomeUser(name: string) {
        await expect(this.page.getByText(name)).toBeVisible();
    }

    async logout() {
        await this.logoutButton.click();
    }

    async cartBanksAreVisible(accounts: readonly AccountFixture[]) {
        await expect(this.balanceCards).toBeVisible();

        // for (const account of accounts) {
        //     const card = this.page.getByTestId(`account-card-${account.id}`);
        //     await expect(card).toBeVisible();

        //     // Strict sur type + numéro (texte brut dans des divs)
        //     await expect(card.locator(".balance-card-type")).toHaveText(account.type);
        //     await expect(card.locator(".balance-card-number")).toHaveText(account.number);

        //     // Solde : strict via testid (et on vérifie un format cohérent + €)
        //     const balance = this.page.getByTestId(`balance-${account.id}`);
        //     await expect(balance).toBeVisible();
        //     await expect(balance).toContainText("€");

        //     // Option strict++ : vérifier que ça ressemble à un montant (avec , ou .)
        //     await expect(balance).toHaveText(/[\d\s.,]+€/);
        // }
    }

    async transactionHistoryIsVisible() {
        await expect(this.transactionCards).toBeVisible();
    }
}