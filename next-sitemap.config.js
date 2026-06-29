/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://username.github.io/LumenArt',
  generateRobotsTxt: true,
  outDir: './out',
  trailingSlash: true,
};
