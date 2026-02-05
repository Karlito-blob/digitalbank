import { expect, Locator, Page } from "@playwright/test";

export class BillPage {
    readonly page: Page;
    readonly pendingBillsContainer: Locator;
    readonly successToast: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.pendingBillsContainer = page.getByTestId("pending-bills");
        this.successToast = page.getByTestId("bill-success");
    }

    private pendingBillItemByReference(reference: string): Locator {
        return this.page.locator(".bill-item", {
            has: this.page.locator(".bill-reference", { hasText: reference }),
        });
    }

    async payBillPending(reference: string, expectedSuccessMessage: string) {
        const bill = this.pendingBillItemByReference(reference);

        await expect(bill).toBeVisible();
        const payButton = bill.getByRole("button", { name: "Payer la facture" });
        await expect(payButton).toBeVisible();
        await payButton.click();
        await expect(this.page.getByText(expectedSuccessMessage)).toBeVisible();
    }

    get successMessage(): Locator {
        return this.successToast;
    }
}