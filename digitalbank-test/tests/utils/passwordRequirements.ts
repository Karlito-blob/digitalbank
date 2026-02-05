import { expect, Locator } from "@playwright/test";

export type PasswordRulesExpected = {
    length: boolean;
    upper: boolean;
    lower: boolean;
    number: boolean;
    special: boolean;
};

export async function expectRuleIcon(ruleLocator: Locator, shouldPass: boolean) {
    // On vérifie le début de texte: ✓ ou ✗
    // (plus robuste que de vérifier le texte entier)
    if (shouldPass) {
        await expect(ruleLocator).toContainText(/^✓/);
    } else {
        await expect(ruleLocator).toContainText(/^✗/);
    }
}

export async function expectPasswordRequirements(
    rulesLocators: {
        length: Locator;
        upper: Locator;
        lower: Locator;
        number: Locator;
        special: Locator;
    },
    expected: PasswordRulesExpected
) {
    await expectRuleIcon(rulesLocators.length, expected.length);
    await expectRuleIcon(rulesLocators.upper, expected.upper);
    await expectRuleIcon(rulesLocators.lower, expected.lower);
    await expectRuleIcon(rulesLocators.number, expected.number);
    await expectRuleIcon(rulesLocators.special, expected.special);
}
