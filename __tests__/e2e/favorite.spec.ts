import { test, expect } from "@playwright/test";

test("should add an album to favorites", async ({ page }) => {
  await page.goto("/");

  // Find an album action button and click on it
  await page.click('button[title="actions"]');

  // Wait for the 'Add to favorites' button to appear within the popover.
  await page.waitForSelector("text=Add to favorites", { state: "visible" });

  // Now click on 'Add to favorites'
  await page.click("text=Add to favorites");

  // Now click on Favorites button to see the saved album
  await page.click('button:has-text("Favorites")');

  // Verify if there's at least one favorite album with a valid Apple Music link
  const favoriteAlbumLinks = await page.$$(
    'a[href^="https://music.apple.com/"]'
  );
  expect(favoriteAlbumLinks.length).toBeGreaterThan(0);
});
