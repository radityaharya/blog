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
  test(`Find broken links on ${targetUrl}`, async ({ page }) => {
    // only check http(s) links
    if (targetUrl.startsWith('http')) {
      const response = await page.goto(targetUrl)
      expect(response!.status()).toBeLessThan(400)

      const links = await page.$$eval('a', (as) => as.map((a) => a.getAttribute('href')))
      for (const link of links) {
        if (link?.startsWith('http')) {
          const response = await page.goto(link)
          console.log(`Checking link ${link} on page ${targetUrl}`)
          expect(response!.status()).toBeLessThan(400)
        }
      }
    }
  })
}
