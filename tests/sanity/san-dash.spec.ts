import { test } from "@playwright/test";

// Import des Pages
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NavigationPage } from "../pages/NavigationPage";

// Import des jeux de données
import { messagesFixture } from "../fixtures/alertMessage.fixture";
import { jddTest } from "../fixtures/jdd.fixture";
import { twoFactorAuthFixture } from "../fixtures/2fa.fixture";

// Import des fonctions utilitaires
import { expectMessage } from "../utils/expectMessage.utils";

const individu = jddTest;
const valid2FACode = twoFactorAuthFixture.valid_code;

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