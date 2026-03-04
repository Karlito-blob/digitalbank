import { test, expect } from "@playwright/test";

// Import des Pages
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NavigationPage } from "../pages/NavigationPage";

// Import du jeu de donnée
import { jddJean } from "../fixtures/jdd.fixture";

test.describe("Dashboard Smoke Tests", () => {
    const individu = jddJean;
    let connexionPage: ConnexionPage;
    let dashboardPage: DashboardPage;
    let navigationPage: NavigationPage;
    
    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        dashboardPage = new DashboardPage(page);
        navigationPage = new NavigationPage(page);
        // Given un utilisateur connecté
        await navigationPage.navigateToLogin();
        await connexionPage.login(individu.user.email, individu.user.password);
    }
    );

    test("SMK-DASH-01 - Chargement du dashboard", async () => {
        // When le dashboard s’affiche
        await dashboardPage.welcomeUser(individu.user.name);
        // Then les cartes comptes et la liste des transactions sont visibles
        await dashboardPage.cartBanksAreVisible(individu.accounts);
        await dashboardPage.transactionHistoryIsVisible();
    });
});