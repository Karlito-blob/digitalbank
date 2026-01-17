import { Page, expect } from "@playwright/test";
import users from "../fixtures/users.json";

async function login(page: Page, email: string, password: string) {
    await page.goto("/login");

    await page.getByLabel(/email|adresse email/i).fill(email);
    await page.locator('#password').fill(password);

    await page.getByRole("button", { name: /se connecter|connexion/i }).click();

    // Vérification post-login simple
    await expect(page).not.toHaveURL(/login/);
}

export async function loginAsPatient(page: Page) {
    await login(page, users.patient.email, users.patient.password);
}

export async function loginAsPractitioner(page: Page) {
    await login(page, users.praticien.email, users.praticien.password);
}