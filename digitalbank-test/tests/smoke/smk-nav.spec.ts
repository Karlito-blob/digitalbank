// Given un utilisateur connecté
// When il navigue dans les onglets principaux
// Then chaque onglet affiche le contenu attendu

// import { test } from "@playwright/test";
// import { ConnexionPage } from "../pages/ConnexionPage";
// import { NavigationPage } from "../pages/NavigationPage";

// test.describe("Navigation principale - Tests de fumée", () => {
//     test("SMK-NAV-01 - Navigation entre onglets", async ({ page }) => {
//         const connexionPage = new ConnexionPage(page);
//         const navigationPage = new NavigationPage(page);

//         // Given un utilisateur connecté
//         await navigationPage.navigateToLogin();
//         await connexionPage.loginWith2FA(