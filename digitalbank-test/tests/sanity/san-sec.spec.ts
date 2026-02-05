import { test, expect } from "@playwright/test";

//POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { NavigationPage } from "../pages/NavigationPage";

// Fixtures
import { messagesFixture } from "../fixtures/error-message.fixture";
import { jddJean } from "../fixtures/jdd.fixture";

const individu = jddJean;

test.describe("Sanity tests - ", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        await navigationPage.navigateToLogin();
        await connexionPage.login(individu.user.email, individu.user.password);
    });

    test("SAN-SEC-01 - Consultation infos sécurité", async ({ page }) => {
    });
    
    test("SAN-SEC-02 - Modification du mot de passe – succès", async ({ page }) => {
    });

    test("SAN-SEC-03 - Modification du mot de passe – échec (mot de passe actuel incorrect)", async ({ page }) => {
    });
}); 