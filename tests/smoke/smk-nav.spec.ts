import { test } from "@playwright/test";

// Import des Pages
import { ConnexionPage } from "../pages/ConnexionPage";
import { NavigationPage } from "../pages/NavigationPage";

// Import du jeu de donnée
import { jddMarie } from "../fixtures/jdd.fixture";
import { twoFactorAuthFixture } from "../fixtures/2fa.fixture";

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
        // Given un utilisateur connecté
        await navigationPage.navigateToLogin();
        await connexionPage.loginWith2FA(individu.user.email, individu.user.password, valid2FACode);
        // When il navigue dans les onglets principaux
        // Then chaque onglet affiche le contenu attendu
        await navigationPage.navigateToDashboard();
        await navigationPage.navigateToTransfer();
        await navigationPage.navigateToBills();
        await navigationPage.navigateToSecurityPage();
    });
});