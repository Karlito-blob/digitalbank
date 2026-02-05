/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";

//POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { NavigationPage } from "../pages/NavigationPage";

// Fixtures
import { messagesFixture } from "../fixtures/error-message.fixture";

test.describe("Sanity tests - Authentification", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;

    test("SAN-AUTH-01 - Connexion refusée – mot de passe incorrect", async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        await navigationPage.navigateToLogin();
        await connexionPage.login("test@digitalbank.fr", "wrongpassword");
        await expect(connexionPage.loginErrorMessage).toHaveText(messagesFixture.error_messages.invalid_credentials);
        console.log("Error message displayed:", await connexionPage.loginErrorMessage.textContent());
    });
});

test.describe("Sanity tests - Reset", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;

    test("SAN-RESET-02 - Réinitialisation de mot de passe – email non enregistré", async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        await navigationPage.navigateToLogin();
        await connexionPage.forgotPassword("ts@wxsx");
        await expect(connexionPage.errorMessage).toHaveText(messagesFixture.error_messages.no_account_for_email);
        console.log("Error message displayed:", await connexionPage.errorMessage.textContent());
    });
});