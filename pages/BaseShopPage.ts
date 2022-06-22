import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import LoginPage from "./loginPage";

export class BaseShopPage extends BasePage {
  readonly itemsInCart: Locator;
  protected cartIcon: Locator;
  protected burgerMenuButton: Locator;
  protected logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.itemsInCart = this.page.locator(".shopping_cart_badge");
    this.cartIcon = this.page.locator("#shopping_cart_container");
    this.burgerMenuButton = this.page.locator("#react-burger-menu-btn");
    this.logoutButton = this.page.locator("#logout_sidebar_link")
  }

 async logout(){
    await this.burgerMenuButton.click()
    await this.logoutButton.click()
    return new LoginPage(this.page)
 }
}
