/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";

// POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";

// Fixture
import { jddJean, jddTest } from "../fixtures/jdd.fixture";

const individu = jddJean;

test.describe("Authentication Smoke Tests", () => {
    let connexionPage: ConnexionPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        dashboardPage = new DashboardPage(page);
    });

    test("SMK-AUTH-01 - Connexion réussie sans 2FA", async () => {
        // Given la page de login
        await connexionPage.navigate();
        // When l’utilisateur se connecte avec des identifiants valides
        await connexionPage.login(individu.user.email, individu.user.password);
        // Then la session est ouverte et les onglets principaux sont visibles
        await dashboardPage.welcomeUser(individu.user.name);
    });

});

test.describe("Déconnexion Smoke Tests", () => {
    let connexionPage: ConnexionPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        dashboardPage = new DashboardPage(page);

        // Given un utilisateur connecté
        await connexionPage.navigate();
        await connexionPage.login(individu.user.email, individu.user.password);
    });

    test("SMK-AUTH-02 - Déconnexion utilisateur", async () => {
        // When il ouvre le menu utilisateur et clique sur déconnexion
        await dashboardPage.logout();
        // Then la session est fermée
        await connexionPage.formIsVisible();
    });
});