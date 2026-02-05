import { test, expect } from "@playwright/test";

//POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NavigationPage } from "../pages/NavigationPage";
import { TransferPage } from "../pages/TransferPage";

// Fixture
import { jddJean, jddTest } from "../fixtures/jdd.fixture";
import { describe } from "node:test";

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

        // When l’utilisateur se connecte avec des identifiants valides
        await connexionPage.login(individu.user.email, individu.user.password);
    });

    test("E2E-TRAN-01 - Ajout d'un bénéficiaire", async () => {
        const navigationPage = new NavigationPage(connexionPage.page);
        const transferPage = new TransferPage(connexionPage.page);

        await navigationPage.navigateToTransfer();
        await transferPage.addNewBeneficiaire("Jean Dupont", "FR7612345678901234567890123");
        await transferPage.checkUserBeneficiaries("Jean Dupont");
    });

});