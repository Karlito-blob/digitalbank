/* eslint-disable testing-library/prefer-screen-queries */
import { test } from "@playwright/test";

//POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { NavigationPage } from "../pages/NavigationPage";
import { BillPage } from "../pages/BillPage";

// Fixtures
import { messagesFixture } from "../fixtures/alertMessage.fixture";
import { jddJean } from "../fixtures/jdd.fixture";
import { twoFactorAuthFixture } from "../fixtures/2fa.fixture";

// utils
import { expectMessage } from "../utils/expectMessage.utils";

// variables globales
const individu = jddJean;


test.describe("Sanity tests - Paiement de facture", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;
    let billPage: BillPage;
    
    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        billPage = new BillPage(page);
        await navigationPage.navigateToLogin();
        await connexionPage.login(individu.user.email, individu.user.password);
        await navigationPage.navigateToBills();
    });

    test("SAN-BILL-01 - Affichage factures en attente", async ({ page }) => {
    });
});    