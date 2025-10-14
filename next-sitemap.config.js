export default {
  siteUrl: process.env.SITE_URL || 'https://vivanto-site.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/404', '/_not-found'],
  changefreq: 'weekly',
  priority: 0.7,
  outDir: 'public',
};
