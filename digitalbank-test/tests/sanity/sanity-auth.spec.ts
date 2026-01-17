/* eslint-disable testing-library/prefer-screen-queries */

import { test, expect } from "@playwright/test";
import { loginAsStandardAccount } from "../utils/auth";

test.describe("Sanity - Authentification", () => {

    test("Connexion standard account", async ({ page }) => {
        await loginAsStandardAccount(page);
        await expect(page.getByRole("button", { name: "Mes comptes" })).toBeVisible();
    });

});