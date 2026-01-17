import { Page, expect } from "@playwright/test";
import users from "../fixtures/users.json";

async function login(page: Page, email: string, password: string) {
    await page.goto("/");

    await page.getByLabel(/email|adresse email/i).fill(email);
    await page.locator('#password').fill(password);

    await page.getByRole("button", { name: /se connecter|connexion/i }).click();

    // Vérification post-login simple
    await expect(page).not.toHaveURL(/login/);
}

export async function loginAsStandardAccount(page: Page) {
    await login(page, users.standard_account.email, users.standard_account.password);
}

export async function loginAsPractitioner(page: Page) {
    await login(page, users.double_auth_account.email, users.double_auth_account.password);
}