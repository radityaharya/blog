import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { slug } from 'github-slugger'
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' assert { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title><![CDATA[ ${post.title} ]]></title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description><![CDATA[ ${post.summary} ]]></description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags?.map((t) => `<category><![CDATA[ ${t} ]]></category>`).join('')}
    <content:encoded><![CDATA[ ${post.body.raw.replace(/\]\(\/blog\//g, `](${config.siteUrl}/blog/`).replace("\n", "<br>")} ]]></content:encoded>
    <dc:creator>${config.email} (${config.author})</dc:creator>
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => `
  <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <image>
        <url>${config.siteUrl}/static/images/favicons/android-chrome-192x192.png</url>
        <title>${escape(config.title)}</title>
        <link>${config.siteUrl}/blog</link>
      </image>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`

async function generateRSS(config, allBlogs, page = 'feed.xml') {
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  // RSS for blog post
  if (publishPosts.length > 0) {
    const rss = generateRss(config, sortPosts(publishPosts))
    writeFileSync(`./public/${page}`, rss)
  }

  if (publishPosts.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = allBlogs.filter((post) => post.tags.map((t) => slug(t)).includes(tag))
      const rss = generateRss(config, filteredPosts, `tags/${tag}/${page}`)
      const rssPath = path.join('public', 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, page), rss)
    }
  }
}

const rss = () => {
  generateRSS(siteMetadata, allBlogs)
}
export default rss
