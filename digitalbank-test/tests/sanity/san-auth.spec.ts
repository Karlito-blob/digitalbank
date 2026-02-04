/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";

//POM
import { ConnexionPage } from "../pages/ConnexionPage";

// Fixtures
import { messagesFixture } from "../fixtures/error-message.fixture";

test.describe("Sanity tests - Authentification", () => {
    let connexionPage: ConnexionPage;

    test("SAN-AUTH-01 - Connexion refusée – mot de passe incorrect", async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        await connexionPage.navigate();
        await connexionPage.login("test@digitalbank.fr", "wrongpassword");
        await expect(connexionPage.loginErrorMessage).toHaveText(messagesFixture.error_messages.invalid_credentials);
        console.log("Error message displayed:", await connexionPage.errorMessage.textContent());
    });
});

test.describe("Sanity tests - Reset", () => {
    let connexionPage: ConnexionPage;

    test("SAN-RESET-02 - Réinitialisation de mot de passe – email non enregistré", async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        await connexionPage.navigate();
        await connexionPage.forgotPassword("ts@wxsx");
        await expect(connexionPage.errorMessage).toHaveText(messagesFixture.error_messages.no_account_for_email);
        console.log("Error message displayed:", await connexionPage.errorMessage.textContent());
    });
});