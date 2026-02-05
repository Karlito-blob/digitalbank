/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";

//POM
import { ConnexionPage } from "../pages/ConnexionPage";
import {TransferPage} from "../pages/TransfertPage";
import { NavigationPage } from "../pages/NavigationPage";

// Fixtures
import { messagesFixture } from "../fixtures/alertMessage.fixture";
import { jddJean } from "../fixtures/jdd.fixture";

// utils
import { expectMessage } from "../utils/expectMessage.utils";

// variables globales
const individu = jddJean;

test.describe("Sanity tests - Virements interne", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;
    let transferPage: TransferPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        transferPage = new TransferPage(page);

        await navigationPage.navigateToLogin();
        await connexionPage.login(individu.user.email, individu.user.password);
        await navigationPage.navigateToTransfer();
    });

    test("SAN-TRF-01 - Accès formulaire de virement", async ({ page }) => {
        await transferPage.checkFormTransfer();
    });
    
    // test("SAN-TRF-02 - Rejet virement montant negatif", async ({ page }) => {
    //     await transferPage.virementInterne(individu.accounts[0].id, individu.accounts[1].id, -100, "Virement test");
    //     await expectMessage(transferPage.errorMessage, messagesFixture.error_messages.insufficient_montant);
    // });

    test("SAN-TRF-03 - Rejet virement solde insuffisant", async ({ page }) => {
        await transferPage.virementInterne(individu.accounts[0].id, individu.accounts[1].id, 1000000, "Virement test");
        await expectMessage(transferPage.errorTransfertMessage, messagesFixture.error_messages.insufficient_funds);
    });
});


test.describe("Sanity tests - Ajout bénéficiaire", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;
    let transferPage: TransferPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        transferPage = new TransferPage(page);

        await navigationPage.navigateToLogin();
        await connexionPage.login(individu.user.email, individu.user.password);
        await navigationPage.navigateToTransfer();
    });

    test("SAN-BEN-01 - Ouverture / fermeture ajout bénéficiaire", async ({ page }) => {
        await transferPage.checkModalBeneficiary();
    });

    // test("SAN-BEN-02 - Ajout bénéficiaire sans nom", async ({ page }) => {
    //     await transferPage.addNewBeneficiaire("", "FR7612345678901234567890123");
    // });


    // test("SAN-BEN-03 - Ajout bénéficiaire avec IBAN invalide", async ({ page }) => {
    //     await transferPage.addNewBeneficiaire("Jean Dupont", "invalid_iban");
    //     await expectMessage(transferPage.errorMessage, messagesFixture.error_messages.invalid_iban);
    // });
});