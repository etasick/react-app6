const { writeFileSync } = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
//const fetch = require('node-fetch'); // Ensure this is installed
//import fetch from 'node-fetch';
const baseUrl = 'https://vapesandcarts.com/';

const staticPaths = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about-us', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.8 },
  { url: '/shop', changefreq: 'weekly', priority: 0.9 },
];

const fetchDynamicPaths = async () => {
const fetch = (await import('node-fetch')).default;
  try {
    // Fetch categories
    const categoriesResponse = await fetch(
      'https://supplement-app-d151447d38d4.herokuapp.com/api/categories/by-store/677002f923896fcda6ab960d'
    );
    const categories = await categoriesResponse.json();

    // Map categories to sitemap paths
    const categoryPaths = categories.map((category) => ({
      url: `/category/${category._id}`,
      changefreq: 'weekly',
      priority: 0.9,
    }));

    // Fetch products
    const productsResponse = await fetch(
      'https://supplement-app-d151447d38d4.herokuapp.com/api/products/store/677002f923896fcda6ab960d'
    );
    const products = await productsResponse.json();

    // Map products to sitemap paths
    const productPaths = products.map((product) => ({
      url: `/product/${product._id}`,
      changefreq: 'weekly',
      priority: 0.8,
    }));

    return [...categoryPaths, ...productPaths];
  } catch (error) {
    console.error('❌ Error fetching dynamic paths:', error);
    return [];
  }
};

const generateSitemap = async () => {
  try {
    const dynamicPaths = await fetchDynamicPaths();

    // Combine static and dynamic paths
    const allPaths = [...staticPaths, ...dynamicPaths];

    const sitemap = new SitemapStream({ hostname: baseUrl });

    // Write all paths to the sitemap
    allPaths.forEach((path) => sitemap.write(path));
    sitemap.end();

    // Convert the sitemap stream to XML
    const xml = await streamToPromise(sitemap).then((data) => data.toString());

    // Write the sitemap to the public directory
    writeFileSync('./public/sitemap.xml', xml, 'utf-8');
    console.log('✅ Sitemap with dynamic categories and products generated successfully');
  } catch (err) {
    console.error('❌ Error generating sitemap:', err);
  }
};

generateSitemap();
