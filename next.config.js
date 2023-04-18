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
