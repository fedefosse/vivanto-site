/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://vivanto.co',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  sitemapSize: 5000,
  exclude: ['/404', '/_not-found'],
  changefreq: 'weekly',
  priority: 0.7,
  outDir: 'public',
};

module.exports = config;