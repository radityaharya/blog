const { withAxiom } = require("next-axiom")

module.exports = withAxiom({
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "user-images.githubusercontent.com",
      "s3.us-west-2.amazonaws.com",
      "res.cloudinary.com",
      "r2.radityaharya.com",
      "www.radityaharya.com",
      "radityaharya.com",
      "qnhjmybhvmffhqxsggxx.supabase.co",
    ],
    minimumCacheTTL: 60,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
})


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "raditya-harya",
    project: "blog",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
