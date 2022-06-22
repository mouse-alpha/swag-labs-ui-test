import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductsPage } from "./ProductsPage";

export default class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.username = this.page.locator("#user-name");
    this.password = this.page.locator("#password");
    this.loginButton = this.page.locator("#login-button");
  }

  async login(username, password) {
    await this.username.fill(username), await this.password.fill(password);
    await this.loginButton.click();
    return new ProductsPage(this.page);
  }
}
