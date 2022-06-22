import { BaseShopPage } from "./BaseShopPage";
import { Locator, Page } from "@playwright/test";
import { CheckoutOverviewPage } from "./CheckoutOverviewPage";

export class CheckoutInformationPage extends BaseShopPage {
  private continueButton: Locator;
  readonly zipCode: Locator;
  readonly lastName: Locator;
  readonly firstName: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = this.page.locator("#first-name");
    this.lastName = this.page.locator("#last-name");
    this.zipCode = this.page.locator("#postal-code");
    this.continueButton = this.page.locator("#continue");
  }

  async setInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zipCode.fill(zipCode);
  }

  async continue() {
    this.continueButton.click();
    return new CheckoutOverviewPage(this.page);
  }
}
