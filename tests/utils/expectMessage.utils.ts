import { expect, Locator } from "@playwright/test";

export async function expectMessage(
  locator: Locator,
  expectedMessage: string
) {
  await expect(locator).toBeVisible();
  await expect(locator).toHaveText(expectedMessage);
}