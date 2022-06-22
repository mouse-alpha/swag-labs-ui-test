import { Locator } from "@playwright/test";
import { BaseItemElement } from "./BaseItemElement";

export class CartItemElement extends BaseItemElement {
  private removeButton: Locator;

  constructor(elementBaseLocator: Locator) {
    super(elementBaseLocator);
    this.removeButton = this.baseLocator.locator("[data-test^='remove']");
  }

  async removeFromCart() {
    await this.removeButton.click();
  }
}
