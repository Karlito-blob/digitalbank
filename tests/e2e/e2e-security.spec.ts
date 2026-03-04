import { test } from "@playwright/test";

//POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { NavigationPage } from "../pages/NavigationPage";
import { SecurityPage } from "../pages/SecurityPage";

// Fixtures
import { jddJean, jddMarie } from "../fixtures/jdd.fixture";
import { twoFactorAuthFixture } from "../fixtures/2fa.fixture";
import { messagesFixture } from "../fixtures/alertMessage.fixture";

// Utils
import { setToggle } from "../utils/toggle.utils";
import { expectMessage } from "../utils/expectMessage.utils";

const individu = jddJean;
const individu2 = jddMarie;
const valid2FACode = twoFactorAuthFixture.valid_code;

test.describe("E2E - Settings 2FA ", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;
    let securityPage: SecurityPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        securityPage = new SecurityPage(page);
        await navigationPage.navigateToLogin();
    });

    test("E2E-2FA-TGL-01 - Login avec 2FA activé", async ({ page }) => {
        await connexionPage.login(individu.user.email, individu.user.password);
        await navigationPage.navigateToSecurityPage();
        await setToggle(securityPage.toggle2FA, true);
        await navigationPage.logout();
        await connexionPage.loginWith2FA(individu.user.email, individu.user.password, valid2FACode)
        await navigationPage.navigateToSecurityPage();
    });

    test("E2E-2FA-TGL-01 - Login avec 2FA désactivité", async ({ page }) => {
        await connexionPage.loginWith2FA(individu2.user.email, individu2.user.password, valid2FACode)
        await navigationPage.navigateToSecurityPage();
        await setToggle(securityPage.toggle2FA, false);
        await navigationPage.logout();
        await connexionPage.login(individu2.user.email, individu2.user.password);
        await navigationPage.navigateToSecurityPage();
    });
});

test.describe("E2E - Modify PWD ", () => {
    let connexionPage: ConnexionPage;
    let navigationPage: NavigationPage;
    let securityPage: SecurityPage;

    test.beforeEach(async ({ page }) => {
        connexionPage = new ConnexionPage(page);
        navigationPage = new NavigationPage(page);
        securityPage = new SecurityPage(page);
        await navigationPage.navigateToLogin();
        await connexionPage.login(individu.user.email, individu.user.password);
        await navigationPage.navigateToSecurityPage();
    });

    test("E2E-PWD-01 - Changement de mot de passe complet", async ({ page }) => {
        await securityPage.changeCurrentPassword(individu.user.password, individu.user.new_password, individu.user.new_password);
        await expectMessage(securityPage.successChangePassword, messagesFixture.valid_credentials.success_change_password);
        await navigationPage.logout();
        await connexionPage.login(individu.user.email, individu.user.password);
        await expectMessage(connexionPage.loginErrorMessage, messagesFixture.error_messages.invalid_credentials);
        await connexionPage.login(individu.user.email, individu.user.new_password);
    });

});