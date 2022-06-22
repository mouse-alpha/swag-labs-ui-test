import { Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";
import { CheckoutCompletePage } from "./CheckoutCompletePage";
import { BaseItemElement } from "./elements/BaseItemElement";
import { CartItemElement } from "./elements/CartItemElement";

export class CheckoutOverviewPage extends BaseShopPage {
  private finishButton: Locator;
  readonly paymentInformation: Locator;
  readonly shippingInformation: Locator;
  readonly totalPrice: Locator;
  readonly taxPrice: Locator;
  readonly itemTotalPrice: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = this.page.locator(".cart_item");
    this.finishButton = this.page.locator("#finish");
    this.paymentInformation = this.page.locator(".summary_value_label").nth(0);
    this.shippingInformation = this.page.locator(".summary_value_label").nth(1);
    this.totalPrice = this.page.locator(".summary_total_label");
    this.taxPrice = this.page.locator(".summary_tax_label");
    this.itemTotalPrice = this.page.locator(".summary_subtotal_label");
  }

  async finish() {
    await this.finishButton.click();
    return new CheckoutCompletePage(this.page);
  }

  async getItemByName(name: string) {
    await this.page.waitForSelector(".cart_item");
    const count = await this.cartItems.count();
    for (let i = 0; i < count; ++i) {
      const item = new BaseItemElement(this.cartItems.nth(i));
      if ((await item.name.innerText()) == name) {
        return item;
      }
    }
    throw `Item with name  "${name}" is missing from Overview`;
  }
}
