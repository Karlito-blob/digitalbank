import { test } from "@playwright/test";

// Import des Pages
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NavigationPage } from "../pages/NavigationPage";

// Import du jeu de donnée
import { jddJean } from "../fixtures/jdd.fixture";

const individu = jddJean;

test.describe("Authentication Smoke Tests", () => {

    let connexionPage: ConnexionPage;
    let dashboardPage: DashboardPage;
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        dashboardPage = new DashboardPage(page);
        navigationPage = new NavigationPage(page);
        // Given la page de login
        await navigationPage.navigateToLogin();
    });

    test("SMK-AUTH-01 - Connexion réussie sans 2FA", async () => {
        // When l’utilisateur se connecte avec un compte sans 2FA
        await connexionPage.login(individu.user.email, individu.user.password);
        // Then la session est ouverte et les onglets principaux sont visibles
        await dashboardPage.welcomeUser(individu.user.name);
    });

    test("SMK-AUTH-02 - Déconnexion utilisateur", async () => {
        // Given un utilisateur connecté
        await connexionPage.login(individu.user.email, individu.user.password);
        // When il ouvre le menu utilisateur et clique sur déconnexion
        await navigationPage.logout();
        // Then la session est fermée
        await connexionPage.formIsVisible();
    });
});