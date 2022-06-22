import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BaseShopPage } from "./BaseShopPage";
import { CheckoutInformationPage } from "./CheckoutInformationPage";
import { CartItemElement } from "./elements/CartItemElement";

export class CartPage extends BaseShopPage {
  readonly cartItems: Locator;
  private checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = this.page.locator(".cart_item");
    this.checkoutButton = this.page.locator("#checkout");
  }

  async getItemByName(name: string) {
    const count = await this.cartItems.count();
    for (let i = 0; i < count; ++i) {
      const item = new CartItemElement(this.cartItems.nth(i));
      if ((await item.name.innerText()) == name) {
        return item;
      }
    }
    throw `Item with name  "${name}" is missing from Cart`;
  }

  async removeItemToCart(itemName: string) {
    (await this.getItemByName(itemName)).removeFromCart();
  }

  async processToCheckout() {
    await this.checkoutButton.click();
    return new CheckoutInformationPage(this.page);
  }
}
