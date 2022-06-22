import { Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";
import { CartItemElement } from "./elements/CartItemElement";
import { ProductsPage } from "./ProductsPage";

export class CheckoutCompletePage extends BaseShopPage {
  readonly header: Locator;
  private backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = this.page.locator(".complete-header");
    this.backHomeButton = this.page.locator("#back-to-products");
  }

  async backHome() {
    await this.backHomeButton.click();
    return new ProductsPage(this.page);
  }
}
