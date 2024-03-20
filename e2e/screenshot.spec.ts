import { expect, test } from '@playwright/test'
import { readFileSync } from 'fs'
import { join } from 'path'

const allBlogs = JSON.parse(
  readFileSync(join(__dirname, '../.contentlayer/generated/Blog/_index.json'), 'utf8')
)

let targetUrls: string[] = allBlogs.map((blog) => {
  return `/${blog._raw.flattenedPath}`
})

targetUrls = ['/', '/blog', '/projects', '/tags', ...targetUrls]

for (const targetUrl of targetUrls) {
  test(`visit page ${targetUrl} and take screenshot`, async ({ page }) => {
    // We visit the page. This waits for the "load" event by default.
    const response = await page.goto(targetUrl)

    // Test that the response did not fail
    expect(response!.status()).toBeLessThan(400)

    // Take a screenshot
    await page.screenshot({
      path: `./test-results/screenshot_${targetUrl.replace(/\//g, '_')}.jpg`,
    })
  })
}