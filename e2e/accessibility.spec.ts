import { expect, test } from '@playwright/test'
import { readFileSync } from 'fs'
import { join } from 'path'
import { AxeBuilder } from '@axe-core/playwright'

const allBlogs = JSON.parse(
  readFileSync(join(__dirname, '../.contentlayer/generated/Blog/_index.json'), 'utf8')
)

let targetUrls: string[] = allBlogs.map((blog) => {
  return `/${blog._raw.flattenedPath}`
})

targetUrls = ['/', '/blog', '/projects', '/tags', ...targetUrls]

for (const targetUrl of targetUrls) {
  test.fixme(`Accessibility check on ${targetUrl}`, async ({ page }) => {
    await page.goto(targetUrl)

    // Run the accessibility check
    const results = await new AxeBuilder({ page }).analyze()
  })
}