/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";

// POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NavigationPage } from "../pages/NavigationPage";

// Fixture
import { jddJean, jddTest } from "../fixtures/jdd.fixture";

const individu = jddJean;

test.describe("Authentication Smoke Tests", () => {
    let connexionPage: ConnexionPage;
    let dashboardPage: DashboardPage;
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        dashboardPage = new DashboardPage(page);
        navigationPage = new NavigationPage(page);

        await navigationPage.navigateToLogin();
    });

    test("SMK-AUTH-01 - Connexion réussie sans 2FA", async () => {
        await connexionPage.login(individu.user.email, individu.user.password);
        await dashboardPage.welcomeUser(individu.user.name);
    });

    test("SMK-AUTH-02 - Déconnexion utilisateur", async () => {
        await connexionPage.login(individu.user.email, individu.user.password);
        await navigationPage.logout();
        await connexionPage.formIsVisible();
    });

});