import { test } from "@playwright/test";

// Import des Pages
import { ConnexionPage } from "../pages/ConnexionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NavigationPage } from "../pages/NavigationPage";

// Import des jeux de données
import { messagesFixture } from "../fixtures/alertMessage.fixture";
import { jddMarie } from "../fixtures/jdd.fixture";
import { twoFactorAuthFixture } from "../fixtures/2fa.fixture";

// Import des fonctions utilitaires
import { expectMessage } from "../utils/expectMessage.utils";

const individu = jddMarie;
const valid2FACode = twoFactorAuthFixture.valid_code;
const invalid2FACode = twoFactorAuthFixture.invalid_code;

test.describe("Sanity tests - Authentification", () => {

    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        // Given un utilisateur sur la page de connexion
        await navigationPage.navigateToLogin();
    });

    test("SAN-AUTH-01 - Connexion refusée – mot de passe incorrect", async ({ page }) => {
        // When l’utilisateur tente de se connecter avec un mot de passe incorrect
        await connexionPage.login("test@digitalbank.fr", "wrongpassword");
        // Then un message d’erreur de connexion s’affiche
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
        // Given un utilisateur avec 2FA activé sur la page de connexion
        await navigationPage.navigateToLogin();
    });

    test("SAN-2FA-01 - Authentification à deux facteurs – code valide", async ({ page }) => {
        // When l’utilisateur se connecte avec un code 2FA valide
        await connexionPage.loginWith2FA(individu.user.email, individu.user.password, valid2FACode);
        // Then la session est établie
        await dashboardPage.welcomeUser(individu.user.name);
    });

    test("SAN-2FA-02 - Authentification à deux facteurs – code invalide", async ({ page }) => {
        // When l’utilisateur se connecte avec un code 2FA invalide
        await connexionPage.loginWith2FA(individu.user.email, individu.user.password, invalid2FACode);
        // Then un message d’erreur de code 2FA s’affiche
        await expectMessage(connexionPage.error2FAMessage, messagesFixture.error_messages.invalid_verification_code);
    });
});

test.describe("Sanity tests - Reset Password", () => {

    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        // Given un utilisateur sur la page de connexion
        await navigationPage.navigateToLogin();
    });

    test("SAN-RESET-01 - Réinitialisation de mot de passe – email enregistré", async ({ page }) => {
        // When l’utilisateur demande une réinitialisation de mot de passe avec un email enregistré
        await connexionPage.forgotPassword(individu.user.email);
        // Then un message de succès s’affiche indiquant que le lien de réinitialisation a été envoyé
        await expectMessage(connexionPage.resetSuccessMessage, `${messagesFixture.valid_credentials.reset_link_sent} ${individu.user.email}`);
    });

    test("SAN-RESET-02 - Réinitialisation de mot de passe – email non enregistré", async ({ page }) => {
        // When l’utilisateur demande une réinitialisation de mot de passe avec un email non enregistré
        await connexionPage.forgotPassword("ts@wxsx");
        // Then un message d’erreur s’affiche indiquant qu’aucun compte n’est associé à cet email
        await expectMessage(connexionPage.resetErrorResetMessage, messagesFixture.error_messages.no_account_for_email);
    });
});