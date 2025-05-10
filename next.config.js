/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['localhost'],
  },
  serverExternalPackages: ["pdfkit"],
}

module.exports = nextConfig 