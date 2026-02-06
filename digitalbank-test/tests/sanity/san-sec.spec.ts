import { test, expect } from "@playwright/test";

//POM
import { ConnexionPage } from "../pages/ConnexionPage";
import { NavigationPage } from "../pages/NavigationPage";
import { SecurityPage } from "../pages/SecurityPage";

// Fixtures
import { messagesFixture } from "../fixtures/alertMessage.fixture";
import { passwordsFixture } from "../fixtures/password.fixture";
import { jddJean } from "../fixtures/jdd.fixture";

// utils
import { expectMessage } from "../utils/expectMessage.utils";
import { expectPasswordRequirements } from "../utils/passwordRequirements";
import { setToggle } from "../utils/toggle.utils";

const individu = jddJean;

const getPasswordRulesLocators = (securityPage: SecurityPage) => ({
    length: securityPage.reqLength,
    upper: securityPage.reqUpper,
    lower: securityPage.reqLower,
    number: securityPage.reqNumber,
    special: securityPage.reqSpecial,
});

async function openChangePasswordModal(securityPage: SecurityPage) {
    await securityPage.changePasswordButton.click();
    await expect(securityPage.inputNewPassword).toBeVisible();

    // Déclenche l’affichage si "hidden" au départ
    await securityPage.typeNewPassword("a");
    await securityPage.expectRequirementsVisible();
}

test.describe("Sanity tests - ", () => {
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

    test("SAN-SEC-01 - Consultation infos sécurité", async ({ page }) => {
        // await securityPage.verifyTogglesVisible();
        await securityPage.verifyUserInfo(individu.user.name, individu.user.email, individu.user.phone);
    });
});

test.describe("Sanity tests - ", () => {
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

    test("SAN-PWD-01 - Ouverture / fermeture changement MDP", async ({ page }) => {
        await securityPage.verifyModalChangePassword();
    });

    test("SAN-PWD-02 - Erreur mot de passe actuel incorrect)", async ({ page }) => {
        await securityPage.changeCurrentPassword("wrongpassword", "NewPassword123!", "NewPassword123!");
        await expectMessage(securityPage.errorPasswordMessage, messagesFixture.error_messages.invalid_password);
    });

    test("SAN-PWD-03 - Erreur confirmation MDP différente)", async ({ page }) => {
        await securityPage.changeCurrentPassword(individu.user.password, "NewPassword123!", "DifferentPassword123!");
        await expectMessage(securityPage.errorPasswordMessage, messagesFixture.error_messages.invalid_matching_password);
    });
});

test.describe("Sanity tests - ", () => {
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

    test("Case: too_short", async ({ }) => {
        await openChangePasswordModal(securityPage);
        const tc = passwordsFixture.too_short;
        await securityPage.typeNewPassword(tc.value);
        await expectPasswordRequirements(getPasswordRulesLocators(securityPage), tc.expected);
    });

    test("Case: only_lowercase", async ({ page }) => {
        await openChangePasswordModal(securityPage);
        const tc = passwordsFixture.only_lowercase;
        await securityPage.typeNewPassword(tc.value);
        await expectPasswordRequirements(getPasswordRulesLocators(securityPage), tc.expected);
    });

    test("Case: only_uppercase", async ({ page }) => {
        await openChangePasswordModal(securityPage);
        const tc = passwordsFixture.only_uppercase;
        await securityPage.typeNewPassword(tc.value);
        await expectPasswordRequirements(getPasswordRulesLocators(securityPage), tc.expected);
    });

    test("Case: missing_special_char", async ({ page }) => {
        await openChangePasswordModal(securityPage);
        const tc = passwordsFixture.missing_special_char;
        await securityPage.typeNewPassword(tc.value);
        await expectPasswordRequirements(getPasswordRulesLocators(securityPage), tc.expected);
    });

    test("Case: fully_compliant", async ({ page }) => {
        await openChangePasswordModal(securityPage);
        const tc = passwordsFixture.fully_compliant;
        await securityPage.typeNewPassword(tc.value);
        await expectPasswordRequirements(getPasswordRulesLocators(securityPage), tc.expected);
    });
});

test.describe("Sanity tests - ", () => {
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

    test("SAN-2FA-TGL-01 - Activation 2FA", async ({ page }) => {
        expect(await securityPage.is2FAEnabled()).toBe(false);
        await setToggle(securityPage.toggle2FA, true);
        await navigationPage.navigateToDashboard();
        await navigationPage.navigateToSecurityPage();
        expect(await securityPage.is2FAEnabled()).toBe(true);
    });
});