import { test, expect, Page } from "@playwright/test";
import LoginPage from "../pages/loginPage";

const STANDARD_USER = "standard_user";
const PROBLEM_USER="problem_user"
const PASSWORD = "secret_sauce";
const CART_ITEMS = ["Sauce Labs Bike Light", "Sauce Labs Backpack"];
const URL = "https://www.saucedemo.com/";

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.describe("buy items", () => {
  test("should allow to buy items", async ({ page }) => {
    const loginPage = new LoginPage(page);
    let productPage = await loginPage.login(STANDARD_USER, PASSWORD);
    await productPage.addItemToCart(CART_ITEMS[0]);
    await expect(productPage.itemsInCart).toHaveText(`${1}`);
    await productPage.addItemToCart(CART_ITEMS[1]);
    await expect(productPage.itemsInCart).toHaveText(`${2}`);
    const cartPage = await productPage.goToCart();
    const infoPage = await cartPage.processToCheckout();
    await infoPage.setInfo("Bob", "Marley", "0017");
    const overviewPage = await infoPage.continue();
    expect(overviewPage.totalPrice).toBeVisible()
    expect(overviewPage.totalPrice).toHaveText('Total: $43.18')
    expect(overviewPage.taxPrice).toBeVisible()
    expect(overviewPage.taxPrice).toHaveText("Tax: $3.20")
    expect(overviewPage.taxPrice).toBeVisible()
    expect(overviewPage.itemTotalPrice).toHaveText("Item total: $39.98")
    const firstItem = await overviewPage.getItemByName(CART_ITEMS[0]);
    expect(firstItem.name).toHaveText(CART_ITEMS[0]);
    const secondItem = await overviewPage.getItemByName(CART_ITEMS[1]);
    expect(secondItem.name).toHaveText(CART_ITEMS[1]);
    const completePage = await overviewPage.finish();
    productPage = await completePage.backHome();
    await expect(productPage.itemsInCart).not.toBeVisible();
  });

  test("should allow checkout empty cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    let productPage = await loginPage.login(STANDARD_USER, PASSWORD);
    const cartPage = await productPage.goToCart();
    const infoPage = await cartPage.processToCheckout();
    await infoPage.setInfo("Bob", "Marley", "0017");
    const overviewPage = await infoPage.continue();
    expect(overviewPage.totalPrice).toBeVisible()
    expect(overviewPage.totalPrice).toHaveText('Total: $0.00')
    expect(overviewPage.taxPrice).toBeVisible()
    expect(overviewPage.taxPrice).toHaveText("Tax: $0.00")
    expect(overviewPage.itemTotalPrice).toBeVisible()
    expect(overviewPage.itemTotalPrice).toHaveText("Item total: $0")
    const completePage = await overviewPage.finish();
    productPage = await completePage.backHome();
    await expect(productPage.itemsInCart).not.toBeVisible();
  });

  test("should allow to remove items from cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    let productPage = await loginPage.login(STANDARD_USER, PASSWORD);
    await productPage.addItemToCart(CART_ITEMS[0]);
    await expect(productPage.itemsInCart).toHaveText(`${1}`);
    await productPage.addItemToCart(CART_ITEMS[1]);
    await expect(productPage.itemsInCart).toHaveText(`${2}`);
    const cartPage = await productPage.goToCart();
    cartPage.removeItemToCart(CART_ITEMS[0]);
    await expect(productPage.itemsInCart).toHaveText(`${1}`);
    cartPage.removeItemToCart(CART_ITEMS[1]);
    await expect(productPage.itemsInCart).not.toBeVisible();
  });

  test("should allow to remove items from product Page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    let productPage = await loginPage.login(STANDARD_USER, PASSWORD);
    await productPage.addItemToCart(CART_ITEMS[0]);
    await expect(productPage.itemsInCart).toHaveText(`${1}`);
    await productPage.addItemToCart(CART_ITEMS[1]);
    await expect(productPage.itemsInCart).toHaveText(`${2}`);
    await productPage.removeItemFromCart(CART_ITEMS[1]);
    await expect(productPage.itemsInCart).toHaveText(`${1}`);
    await productPage.removeItemFromCart(CART_ITEMS[0]);
    await expect(productPage.itemsInCart).not.toBeVisible();
  });

  test("Should not be able to see items of another user", async ({ page }) => {
    let loginPage = new LoginPage(page);
    let productPage = await loginPage.login(STANDARD_USER, PASSWORD);
    await productPage.addItemToCart(CART_ITEMS[0]);
    loginPage = await productPage.logout()
    productPage = await loginPage.login(PROBLEM_USER, PASSWORD);
    await expect(productPage.itemsInCart).not.toBeVisible();
  });
});
