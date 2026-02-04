import { test, expect } from "@playwright/test";

// POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";

// Fixture
import { jddJean, jddTest } from "../fixtures/jdd.fixture";

const individu = jddJean;

test.describe("Dashboard Smoke Tests", () => {
    let connexionPage: ConnexionPage;
    let dashboardPage: DashboardPage;
    
    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        dashboardPage = new DashboardPage(page);

        // Given un utilisateur connecté
        await connexionPage.navigate();
        await connexionPage.login(individu.user.email, individu.user.password);
    }
    );

    test("SMK-DASH-01 - Chargement des cartes et de l'historique des transactions", async () => {
        // When le dashboard s’affiche
        await dashboardPage.welcomeUser(individu.user.name);
        // Then les cartes comptes et la liste des transactions sont visibles
        await dashboardPage.cartBanksAreVisible(individu.accounts);
        await dashboardPage.transactionHistoryIsVisible();
    });
});