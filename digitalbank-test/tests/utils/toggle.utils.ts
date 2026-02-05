import { expect, Locator } from "@playwright/test";

// Toggle un checkbox et vérifie l'état final attendu

// export async function switchToggle(
//   toggle: Locator,
//   expectedChecked: boolean
// ) {
//   // (optionnel) état avant – utile en debug
//   const before = await toggle.isChecked();
//   console.log("Toggle BEFORE:", before);

//   await toggle.click();

//   if (expectedChecked) {
//     await expect(toggle).toBeChecked();
//   } else {
//     await expect(toggle).toBeUnchecked();
//   }

//   const after = await toggle.isChecked();
//   console.log("Toggle AFTER:", after);
// }