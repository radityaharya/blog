interface Props {
  websiteId?: string
  startAt?: number
  endAt?: number
  unit?: 'year' | 'month' | 'hour' | 'day'
  timezone?: string
  url?: string
  referrer?: string
  title?: string
  os?: string
  browser?: string
  device?: string
  country?: string
  region?: string
  city?: string
  language?: string
  event?: string
  limit?: number
}

interface TokenResponse {
  token: string
  user: {
    id: string
    username: string
    createdAt: string
  }
}

async function getToken(): Promise<string> {
  // NEXT_UMAMI_SRC=https://analytics.radityaharya.com/script.js
  const umami_host = (process.env.NEXT_UMAMI_SRC as string).replace('/script.js', '')
  const response = await fetch(`${umami_host}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: process.env.UMAMI_USERNAME,
      password: process.env.UMAMI_PASSWORD,
    }),
  })
  const data = (await response.json()) as TokenResponse
  return data.token
}

/**
 * Fetches data from the Umami API.
 *
 * @param endpoint - The API endpoint to fetch data from.
 * @param options - The options for the API request.
 * @returns A promise that resolves to the fetched data.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchData(endpoint: string, options: Props): Promise<any> {
  const token = await getToken()
  const websiteId = options.websiteId || process.env.WEBSITE_ID
  const queryParams = new URLSearchParams(
    Object.entries({ ...options, websiteId }) as unknown as string[][]
  )
  const umami_host = (process.env.NEXT_UMAMI_SRC as string).replace('/script.js', '')
  const response = await fetch(`${umami_host}/api/${endpoint}?${queryParams}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  console.log(data)
  return data
}

interface ActiveUsersResponse {
  unique_visitors: number
}

/**
 * Retrieves the number of active users for a given website.
 *
 * @param props - The properties object containing the website ID.
 * @returns A Promise that resolves to an object with the number of unique visitors.
 * @throws If there is an error while fetching the data.
 */
async function getActiveUsers(props: Props): Promise<ActiveUsersResponse> {
  return fetchData(`websites/${props.websiteId}/active`, props).then(
    (data) => {
      return { unique_visitors: parseInt(data.x) }
    },
    (error) => {
      console.error(error)
      throw error
    }
  )
}

interface EventsResponseItem {
  event_name: string
  timestamp: Date
  number_of_events: number
}
interface GetEventsResponse {
  data: EventsResponseItem[]
}

/**
 * Retrieves events for a specific website.
 *
 * @param props - The properties for retrieving events.
 * @returns A promise that resolves to the response containing the events.
 */
async function getEvents(props: Props): Promise<GetEventsResponse> {
  return fetchData(`websites/${props.websiteId}/events`, props).then(
    (data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const events = data.map((item: any) => {
        return {
          event_name: item.x,
          timestamp: new Date(item.t),
          number_of_events: item.y,
        }
      }, [])

      return { data: events }
    },
    (error) => {
      console.error(error)
      throw error
    }
  )
}

interface PageviewsResponseItem {
  timestamp: Date
  number_of_visitors: number
}

interface PageviewsResponse {
  pageviews: PageviewsResponseItem[]
  sessions: PageviewsResponseItem[]
}

/**
 * Retrieves pageviews and sessions data for a given website.
 *
 * @param props - The properties required to fetch the data.
 * @returns A promise that resolves to an object containing pageviews and sessions data.
 * @throws An error if the data fetching fails.
 */
async function getPageviews(props: Props): Promise<PageviewsResponse> {
  return fetchData(`websites/${props.websiteId}/pageviews`, props).then(
    (data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pageviews = data.pageviews.map((item: any) => {
        return {
          timestamp: new Date(item.x),
          number_of_visitors: item.y,
        }
      })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sessions = data.sessions.map((item: any) => {
        return {
          timestamp: new Date(item.x),
          number_of_visitors: item.y,
        }
      })

      return { pageviews, sessions }
    },
    (error) => {
      console.error(error)
      throw error
    }
  )
}

interface StatsResponse {
  pageviews: { value: number; change: number }
  uniques: { value: number; change: number }
  bounces: { value: number; change: number }
  totaltime: { value: number; change: number }
}

/**
 * Retrieves the statistics for a specific website.
 *
 * @param props - The properties required to fetch the statistics. See {@link Props} for more details.
 * @returns A promise that resolves to the statistics response.
 */
async function getStats(props: Props): Promise<StatsResponse> {
  return fetchData(`websites/${props.websiteId}/stats`, props)
}

interface GetMetricsProps extends Props {
  type: 'url' | 'referrer' | 'browser' | 'os' | 'device' | 'country' | 'event'
}

interface MetricsTypeMap {
  url: {
    url: string
    number_of_visitors: number
  }
  referrer: {
    referrer: string
    number_of_visitors: number
  }
  browser: {
    browser: string
    number_of_visitors: number
  }
  os: {
    os: string
    number_of_visitors: number
  }
  device: {
    device: string
    number_of_visitors: number
  }
  country: {
    country: string
    number_of_visitors: number
  }
  event: {
    event: string
    number_of_visitors: number
  }
}

/**
 * Retrieves metrics for a specific website and metric type.
 *
 * @param props - The properties for retrieving metrics. See {@link GetMetricsProps} for more details.
 * @returns A promise that resolves to an array of metrics.
 *
 * @example
 * ```typescript
 * getMetrics({
 *   websiteId: '123',
 *   type: 'url',
 *   startAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
 *   endAt: Date.now(),
 * }).then(metrics => {
 *   console.log(metrics);
 * });
 * ```
 */
async function getMetrics(
  props: GetMetricsProps
): Promise<MetricsTypeMap[GetMetricsProps['type']][]> {
  return fetchData(`websites/${props.websiteId}/metrics/${props.type}`, props).then(
    (data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.map((item: any) => {
        const responseItem = {
          [props.type]: item.x,
          number_of_visitors: item.y,
        } as MetricsTypeMap[GetMetricsProps['type']]
        return responseItem
      })
    },
    (error) => {
      console.error(error)
      throw error
    }
  )
}

export { getActiveUsers, getEvents, getPageviews, getStats, getMetrics }
