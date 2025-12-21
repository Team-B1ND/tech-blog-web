import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://tech.b1nd.com';
const API_URL = process.env.VITE_API_URL || 'http://localhost:8080';

async function fetchAllArticles() {
  const articles = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${API_URL}/articles?page=${page}&limit=100`);
    const data = await response.json();

    if (data.data?.articles) {
      articles.push(...data.data.articles);
      hasMore = data.data.pagination.currentPage < data.data.pagination.totalPages;
      page++;
    } else {
      hasMore = false;
    }
  }

  return articles;
}

function generateSitemap(articles) {
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/development', priority: '0.8', changefreq: 'daily' },
    { url: '/design', priority: '0.8', changefreq: 'daily' },
    { url: '/product', priority: '0.8', changefreq: 'daily' },
    { url: '/infra', priority: '0.8', changefreq: 'daily' },
  ];

  const articlePages = articles.map((article) => ({
    url: `/article/${article.id}`,
    lastmod: article.createdAt?.split('T')[0] || today,
    priority: '0.6',
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...articlePages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : `<lastmod>${today}</lastmod>`}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
}

async function main() {
  console.log('Fetching articles from API...');

  try {
    const articles = await fetchAllArticles();
    console.log(`Found ${articles.length} articles`);

    const sitemap = generateSitemap(articles);
    const outputPath = path.join(__dirname, '../dist/sitemap.xml');

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, sitemap, 'utf-8');

    console.log(`Sitemap generated at ${outputPath}`);
  } catch (error) {
    console.error('Failed to generate sitemap:', error.message);
    console.log('Generating sitemap with static pages only...');

    const sitemap = generateSitemap([]);
    const outputPath = path.join(__dirname, '../dist/sitemap.xml');

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, sitemap, 'utf-8');

    console.log(`Static sitemap generated at ${outputPath}`);
  }
}

main();
