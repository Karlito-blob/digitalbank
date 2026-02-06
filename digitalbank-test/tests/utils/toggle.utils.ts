import { expect, Locator } from "@playwright/test";

export async function setToggle(checkbox: Locator, expectedChecked: boolean) {
    // parent group du checkbox -> slider visible associé
    const group = checkbox.locator('xpath=ancestor::div[contains(@class,"toggle-group")]');
    const slider = group.locator(".toggle-slider");

    await slider.waitFor({ state: "visible" });

    const current = await checkbox.isChecked();
    if (current !== expectedChecked) {
        await slider.click();
    }

    await expect(checkbox).toHaveJSProperty("checked", expectedChecked);
}
