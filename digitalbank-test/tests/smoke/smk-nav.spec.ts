// Given un utilisateur connecté
// When il navigue dans les onglets principaux
// Then chaque onglet affiche le contenu attendu

import { test } from "@playwright/test";
import { ConnexionPage } from "../pages/ConnexionPage";
import { NavigationPage } from "../pages/NavigationPage";

// fixture pour la connexion avant chaque test
import { jddMarie } from "../fixtures/jdd.fixture";
import { twoFactorAuthFixture } from "../fixtures/2fa.fixture";

// variables globales
const individu = jddMarie;
const valid2FACode = twoFactorAuthFixture.valid_code;

test.describe("Smoke Test -  Accès aux pages", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
    });

    test("SMK-NAV-01 - Navigation entre onglets", async ({ page }) => {
        await navigationPage.navigateToLogin();
        await connexionPage.loginWith2FA(individu.user.email, individu.user.password, valid2FACode);
        await navigationPage.navigateToDashboard();
        await navigationPage.navigateToTransfer();
        await navigationPage.navigateToBills();
        await navigationPage.navigateToSecurityPage();
    });
});