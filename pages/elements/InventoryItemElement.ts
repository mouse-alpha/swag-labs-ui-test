import { Locator } from "@playwright/test";
import { BaseItemElement } from "./BaseItemElement";

export class InventoryItemELement extends BaseItemElement {
  private addToCartButton: Locator;
  private removeButton: Locator;

  constructor(elementBaseLocator: Locator) {
    super(elementBaseLocator);
    this.addToCartButton = this.baseLocator.locator(
      "[data-test^='add-to-cart']"
    );
    this.removeButton = this.baseLocator.locator("[data-test^='remove']");

  }

  async addToCart() {
    await this.addToCartButton.click();    
    await this.removeButton.isVisible()
  }

  async removeFromCart() {
    await this.removeButton.click();    
    await this.addToCartButton.isVisible()
  }
}
