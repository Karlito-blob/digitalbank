import { test, expect } from "@playwright/test";

// POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NavigationPage } from "../pages/NavigationPage";

// Fixture
import { jddJean, jddTest } from "../fixtures/jdd.fixture";

const individu = jddJean;

test.describe("Dashboard Smoke Tests", () => {
    let connexionPage: ConnexionPage;
    let dashboardPage: DashboardPage;
    let navigationPage: NavigationPage;
    
    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        dashboardPage = new DashboardPage(page);
        navigationPage = new NavigationPage(page);

        await navigationPage.navigateToLogin();
        await connexionPage.login(individu.user.email, individu.user.password);
    }
    );

    test("SMK-DASH-01 - Chargement du dashboard", async () => {
        await dashboardPage.welcomeUser(individu.user.name);
        await dashboardPage.cartBanksAreVisible(individu.accounts);
        await dashboardPage.transactionHistoryIsVisible();
    });
});