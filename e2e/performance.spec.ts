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

const performanceThresholds = {
  LCP: 300,
  FCP: 180,
  FMP: 180,
  CLS: 0.1,
  TBT: 100,
  TTI: 5000,
  TTFB: 100,
  FID: 100
}



for (const targetUrl of targetUrls) {
  // https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint
  test(`evaluate LCP for ${targetUrl}`, async ({ page }) => {
    await page.goto(targetUrl)

    // Inject a PerformanceObserver and access web performance metrics
    const LCP = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const LCP = entries.at(-1)
          resolve(LCP!.startTime)
        }).observe({
          type: 'largest-contentful-paint',
          buffered: true
        })
      })
    })

    // Add custom assertions to fail your check
    // if your web performance degraded
    
    console.log('Largest Contentful Paint', parseInt(LCP as string, 10))
    expect(parseInt(LCP as string, 10)).toBeLessThan(performanceThresholds.LCP)
  })

  // https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint
  test(`evaluate FCP and FMP for ${targetUrl}`, async ({ page }) => {
    await page.goto(targetUrl)
    const paintTimingJson = await page.evaluate(() =>
      JSON.stringify(window.performance.getEntriesByType('paint'))
    )
    const paintTiming = JSON.parse(paintTimingJson)

    //console.log('First Paint', paintTiming[0].startTime)
    //console.log('First Contentful Paint', paintTiming[1].startTime)

    expect(paintTiming[0].startTime).toBeLessThan(performanceThresholds.FCP)
    expect(paintTiming[1].startTime).toBeLessThan(performanceThresholds.FMP)
  })

  // https://web.dev/cls/
  test(`evaluate CLS for ${targetUrl}`, async ({ page }) => {
    await page.goto(targetUrl)

    // Evaluate CLS using the Layout Instability API
    const cumulativeLayoutShift = await page.evaluate(() => {
      return new Promise((resolve) => {
        let CLS = 0

        // Initialize a PerformanceObserver to observe layout-shift entries
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            if (!(entry as any).hadRecentInput) {
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              CLS += (entry as any).value
            }
          })
          resolve(CLS)
        })

        // Observe layout-shift entries
        observer.observe({
          type: 'layout-shift',
          buffered: true
        })
      })
    })

    //console.log(`Cumulative Layout Shift: ${cumulativeLayoutShift}`)

    // Add your assertions based on the retrieved CLS metric
    // For example, check if CLS is within an acceptable range
    expect(cumulativeLayoutShift).toBeLessThan(performanceThresholds.CLS)
  })

  // https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time
  test(`evaluate TBT for ${targetUrl}`, async ({ page }) => {
    await page.goto(targetUrl)

    // Evaluate TBT using the Long Task API
    const totalBlockingTime = await page.evaluate(() => {
      return new Promise((resolve) => {
        let totalBlockingTime = 0

        // Initialize a PerformanceObserver to observe longtask entries
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            // Calculate the difference to the maximal JavaScript execution time of 50 milliseconds
            totalBlockingTime += entry.duration - 50
          })
        })

        // Observe longtask entries
        observer.observe({
          type: 'longtask',
          buffered: true
        })

        // Resolve the promise after a certain duration (5 seconds in this example)
        setTimeout(() => resolve(totalBlockingTime), 5000)
      })
    })

    //console.log(`Total Blocking Time: ${totalBlockingTime}`)

    // Add your assertions based on the retrieved TBT metric
    // For example, check if TBT is within an acceptable range
    expect(totalBlockingTime).toBeLessThan(performanceThresholds.TBT)
  })

  // https://developer.mozilla.org/en-US/docs/Glossary/Time_to_interactive
  test(`evaluate TTI for ${targetUrl}`, async ({ page }) => {
    await page.goto(targetUrl)

    // Evaluate TTI using the Long Task API
    const timeToInteractive = await page.evaluate(() => {
      return new Promise((resolve) => {
        let timeToInteractive = 0

        // Initialize a PerformanceObserver to observe longtask entries
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            // Calculate the difference to the maximal JavaScript execution time of 50 milliseconds
            timeToInteractive = entry.startTime + 5000
          })
        })

        // Observe longtask entries
        observer.observe({
          type: 'longtask',
          buffered: true
        })

        // Resolve the promise after a certain duration (5 seconds in this example)
        setTimeout(() => resolve(timeToInteractive), 5000)
      })
    })

    //console.log(`Time to Interactive: ${timeToInteractive}`)

    // Add your assertions based on the retrieved TTI metric
    // For example, check if TTI is within an acceptable range
    expect(timeToInteractive).toBeLessThan(performanceThresholds.TTI)
  })

  // https://developer.mozilla.org/en-US/docs/Glossary/Time_to_first_byte
  test(`evaluate TTFB for ${targetUrl}`, async ({ page }) => {
    await page.goto(targetUrl)

    // Evaluate TTFB using the Navigation Timing API
    const timeToFirstByte = await page.evaluate(() => {
      const [navigationEntry] = performance.getEntriesByType(
        'navigation'
      ) as PerformanceNavigationTiming[]
      return navigationEntry.responseStart - navigationEntry.startTime
    })

    //console.log(`Time to First Byte: ${timeToFirstByte}`)

    // Add your assertions based on the retrieved TTFB metric
    // For example, check if TTFB is within an acceptable range
    expect(timeToFirstByte).toBeLessThan(performanceThresholds.TTFB)
  })

  // https://developer.mozilla.org/en-US/docs/Glossary/First_input_delay
  test(`evaluate FID for ${targetUrl}`, async ({ page }) => {
    await page.goto(targetUrl)

    // Evaluate FID using the First Input Delay API
    const firstInputDelay = await page.evaluate(() => {
      return new Promise((resolve) => {
        let firstInputDelay = 0

        // Initialize a PerformanceObserver to observe first-input entries
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries() as PerformanceEventTiming[]
          entries.forEach((entry) => {
            firstInputDelay = entry.processingStart - entry.startTime
          })
          resolve(firstInputDelay)
        })

        observer.observe({ type: 'first-input', buffered: true })
      })
    })
    expect(firstInputDelay).toBeLessThan(performanceThresholds.FID)
  })
}
