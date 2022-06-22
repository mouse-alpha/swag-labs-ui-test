import { Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";
import { CartPage } from "./CartPage";
import { InventoryItemELement } from "./elements/InventoryItemElement";

export class ProductsPage extends BaseShopPage {
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryItems = this.page.locator(".inventory_item");
  }

  async getItemByName(name: string) {
    const count = await this.inventoryItems.count();
    for (let i = 0; i < count; ++i) {
      const item = new InventoryItemELement(this.inventoryItems.nth(i));
      if ((await item.name.innerText()) == name) {
        return item;
      }
    }
    throw `Item with name  "${name}" is missing from inventory`;
  }

  async addItemToCart(itemName: string) {
    (await this.getItemByName(itemName)).addToCart();
  }

  async goToCart() {
    await this.cartIcon.click();
    return new CartPage(this.page);
  }
}
