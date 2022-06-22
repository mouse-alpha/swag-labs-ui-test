import { test, expect, Page } from "@playwright/test";
import LoginPage from "../pages/loginPage";

const STANDARD_USER = "standard_user";
const PASSWORD = "secret_sauce";
const CART_ITEMS = ["Sauce Labs Bike Light", "Sauce Labs Backpack"];
const URL = "https://www.saucedemo.com/";

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.describe("buy items", () => {
  test("should allow me to buy items", async ({ page }) => {
    const loginPage = new LoginPage(page);
    let productPage = await loginPage.login(STANDARD_USER, PASSWORD);
    await productPage.addItemToCart(CART_ITEMS[0]);
    await expect(productPage.itemsInCart).toHaveText(`${1}`);
    await productPage.addItemToCart(CART_ITEMS[1]);
    await expect(productPage.itemsInCart).toHaveText(`${2}`);
    const cartPage = await productPage.goToCart();
    cartPage.removeItemToCart(CART_ITEMS[0]);
    await expect(productPage.itemsInCart).toHaveText(`${1}`);
    const infoPage = await cartPage.processToCheckout();
    await infoPage.setInfo("Bob", "Marley", "0017");
    const overviewPage = await infoPage.continue();
    const item = await overviewPage.getItemByName(CART_ITEMS[1]);
    expect(item.name).toHaveText(CART_ITEMS[1]);
    const completePage = await overviewPage.finish();
    productPage = await completePage.backHome();
    await expect(productPage.itemsInCart).not.toBeVisible();
  });
});
