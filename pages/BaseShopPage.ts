import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class BaseShopPage extends BasePage {
  readonly itemsInCart: Locator;
  protected cartIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.itemsInCart = this.page.locator(".shopping_cart_badge");
    this.cartIcon = this.page.locator("#shopping_cart_container");
  }
}
