import { test, expect } from "@playwright/test";

//POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NavigationPage } from "../pages/NavigationPage";
import { TransferPage } from "../pages/TransferPage";

// Fixture
import { jddJean, jddTest } from "../fixtures/jdd.fixture";
import { messagesFixture } from "../fixtures/error-message.fixture";

import { expectMessage } from "../utils/expectMessage.utils";

const individu = jddJean;

test.describe("Virements", () => {
    let connexionPage: ConnexionPage;
    let dashboardPage: DashboardPage;
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        dashboardPage = new DashboardPage(page);
        navigationPage = new NavigationPage(page);
        await navigationPage.navigateToLogin();
        await connexionPage.login(individu.user.email, individu.user.password);
    });

    test("E2E-BEN-01 - Ajout d'un bénéficiaire réussi", async () => {
        const navigationPage = new NavigationPage(connexionPage.page);
        const transferPage = new TransferPage(connexionPage.page);
        await navigationPage.navigateToTransfer();
        await transferPage.addNewBeneficiaire("Jean Dupont", "FR7612345678901234567890123");
        await transferPage.checkUserBeneficiaries("Jean Dupont");
    });

    test("E2E-TRF-INT-01 - Virement interne réussi", async () => {
        const navigationPage = new NavigationPage(connexionPage.page);
        const transferPage = new TransferPage(connexionPage.page);
        await navigationPage.navigateToTransfer();
        await transferPage.virementInterne(individu.accounts[0].id, individu.accounts[1].id, 100, "Virement test");
        await expectMessage(transferPage.successMessage, messagesFixture.valid_credentials.success_virement);
    });
});