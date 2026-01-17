/* eslint-disable testing-library/prefer-screen-queries */

import { test, expect } from "@playwright/test";
import { loginAsPatient, loginAsPractitioner } from "../utils/auth";

test.describe("Sanity - Authentification", () => {

    test("Connexion patient", async ({ page }) => {
        await loginAsPatient(page);
        await expect(page.getByRole("link", { name: "Mes rendez-vous" })).toBeVisible();
    });

    test("Connexion praticien", async ({ page }) => {
        await loginAsPractitioner(page);
        await expect(page.getByRole("link", { name: "Mes rendez-vous" })).toBeVisible();
    });

});