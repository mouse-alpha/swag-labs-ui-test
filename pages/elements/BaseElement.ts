import { Locator } from "@playwright/test";

export class BaseElement {
  protected baseLocator: Locator;

  constructor(elementBaseLocator: Locator) {
    this.baseLocator = elementBaseLocator;
  }
}
