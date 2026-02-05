/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";

//POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NavigationPage } from "../pages/NavigationPage";

// Fixtures
import { messagesFixture } from "../fixtures/alertMessage.fixture";
import { jddMarie } from "../fixtures/jdd.fixture";
import { twoFactorAuthFixture } from "../fixtures/2fa.fixture";

// utils
import { expectMessage } from "../utils/expectMessage.utils";

// variables globales
const individu = jddMarie;
const valid2FACode = twoFactorAuthFixture.valid_code;
const invalid2FACode = twoFactorAuthFixture.invalid_code;

test.describe("Sanity tests - Authentification", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        await navigationPage.navigateToLogin();
    });

    test("SAN-AUTH-01 - Connexion refusée – mot de passe incorrect", async ({ page }) => {
        await connexionPage.login("test@digitalbank.fr", "wrongpassword");
        await expectMessage(connexionPage.loginErrorMessage, messagesFixture.error_messages.invalid_credentials);
    });
});

test.describe("Sanity tests - two Factor Authentification", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;
    let dashboardPage: DashboardPage;
    
    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        dashboardPage = new DashboardPage(page);

        await navigationPage.navigateToLogin();
    });

    test("SAN-2FA-01 - Authentification à deux facteurs – code valide", async ({ page }) => {
        await connexionPage.loginWith2FA(individu.user.email, individu.user.password, valid2FACode);
        await dashboardPage.welcomeUser(individu.user.name);
    });
    
    test("SAN-2FA-02 - Authentification à deux facteurs – code invalide", async ({ page }) => {
        await connexionPage.loginWith2FA(individu.user.email, individu.user.password, invalid2FACode);
        await expectMessage(connexionPage.error2FAMessage, messagesFixture.error_messages.invalid_verification_code);
    });
});

test.describe("Sanity tests - Reset", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        await navigationPage.navigateToLogin();
    });

    test("SAN-RESET-01 - Réinitialisation de mot de passe – email enregistré", async ({ page }) => {
        await connexionPage.forgotPassword(individu.user.email);
        await expectMessage(connexionPage.resetSuccessMessage, `${messagesFixture.valid_credentials.reset_link_sent} ${individu.user.email}`);
    });

    test("SAN-RESET-02 - Réinitialisation de mot de passe – email non enregistré", async ({ page }) => {
        await connexionPage.forgotPassword("ts@wxsx");
        await expectMessage(connexionPage.resetErrorResetMessage, messagesFixture.error_messages.no_account_for_email);
    });
});