// @ts-check
import { test, expect } from '@playwright/test';

test('login page basic interactions', async ({ page }) => {
  // Navigate to the app root (Vite default dev server port)
  await page.goto('http://localhost:5173/');

  // Logo placeholder should be visible
  const logo = page.locator('.logo-placeholder');
  await expect(logo).toBeVisible();

  // Inputs by placeholder
  const username = page.getByPlaceholder('Username');
  const password = page.getByPlaceholder('Password');

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();

  // Focus and fill username
  await username.click();
  await expect(username).toBeFocused();
  await username.fill('alice');
  await expect(username).toHaveValue('alice');

  // Focus and fill password
  await password.click();
  await expect(password).toBeFocused();
  await password.fill('s3cret');
  await expect(password).toHaveValue('s3cret');

  // Four buttons exist and are clickable
  const buttons = page.locator('.button-row button');
  await expect(buttons).toHaveCount(4);

  for (let i = 0; i < 4; i++) {
    const b = buttons.nth(i);
    await expect(b).toBeEnabled();
    await b.click();
  }
});

