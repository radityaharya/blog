import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    site: 'https://radityaharya.com',
    markdown: {
        shikiConfig: {
            themes: {
                light: 'min-dark',
                dark: 'min-light'
            }
        }
    },
    integrations: [
        sitemap(),
        mdx(),
        sitemap(),
        tailwind({
            applyBaseStyles: false
        }),
        icon()
    ],

    adapter: cloudflare({
        platformProxy: {
            configPath: './wrangler.toml'
        }
    })
});
