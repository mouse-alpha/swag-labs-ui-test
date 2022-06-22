import { BaseElement } from "./BaseElement";
import { Locator } from "@playwright/test";

export class BaseItemElement extends BaseElement {
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly quantity: Locator;

  constructor(elementBaseLocator: Locator) {
    super(elementBaseLocator);
    this.name = this.baseLocator.locator(".inventory_item_name");
    this.description = this.baseLocator.locator(".inventory_item_desc");
    this.price = this.baseLocator.locator(".inventory_item_price");
    this.quantity = this.baseLocator.locator(".cart_quantity");
  }
}
