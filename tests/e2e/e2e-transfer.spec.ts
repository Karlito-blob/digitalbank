import { test } from "@playwright/test";

// Import des Pages
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NavigationPage } from "../pages/NavigationPage";
import { TransferPage } from "../pages/TransfertPage";

// Import des jeux de données
import { jddJean } from "../fixtures/jdd.fixture";
import { messagesFixture } from "../fixtures/alertMessage.fixture";

// Import des fonctions utilitaires
import { expectMessage } from "../utils/expectMessage.utils";

const individu = jddJean;

test.describe("Virements - Beneficiaire", () => {

    let connexionPage: ConnexionPage;
    let dashboardPage: DashboardPage;
    let navigationPage: NavigationPage;
    let transferPage: TransferPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        dashboardPage = new DashboardPage(page);
        navigationPage = new NavigationPage(page);
        transferPage = new TransferPage(page);
        await navigationPage.navigateToLogin();
        await connexionPage.login(individu.user.email, individu.user.password);
        await navigationPage.navigateToTransfer();
    });

    test("E2E - BEN-01 - Ajout d'un bénéficiaire réussi", async () => {
        await transferPage.addNewBeneficiaire("Jean Dupont", "FR7612345678901234567890123");
        await transferPage.checkUserBeneficiaries("Jean Dupont");
    });

    test("E2E-TRF-INT-01 - Virement interne réussi", async () => {
        await transferPage.virementInterne(individu.accounts[0].id, individu.accounts[1].id, 100, "Virement test");
        await expectMessage(transferPage.successTransfertMessage, messagesFixture.valid_credentials.success_virement);
    });

    test("E2E-TRF-EXT-02 - Virement vers bénéficiaire réussi", async () => {
        await transferPage.virementExterne(individu.accounts[0].id, individu.beneficiaires[0].name, 1000, "Virement test");
        await expectMessage(transferPage.successTransfertMessage, messagesFixture.valid_credentials.success_virement);
    });
});