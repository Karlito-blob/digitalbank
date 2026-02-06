/* eslint-disable testing-library/prefer-screen-queries */
import { test } from "@playwright/test";

//POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NavigationPage } from "../pages/NavigationPage";

// Fixtures
import { messagesFixture } from "../fixtures/alertMessage.fixture";
import { jddTest } from "../fixtures/jdd.fixture";
import { twoFactorAuthFixture } from "../fixtures/2fa.fixture";

// utils
import { expectMessage } from "../utils/expectMessage.utils";

// variables globales
const individu = jddTest;

test.describe("Sanity tests - Soldes", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;
    let dashboardPage: DashboardPage;
    
    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        dashboardPage = new DashboardPage(page);

        await navigationPage.navigateToLogin();
    });

    test("SAN-DASH-01 - Résultat du solde total", async ({ page }) => {

    });
});