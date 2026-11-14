import type { MetadataRoute } from 'next';

const BASE = 'https://cm.pycon.org';
const ROUTES = ['', '/about', '/agenda', '/speakers', '/sponsors', '/attend', '/venue'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({ url: `${BASE}${r}`, changeFrequency: 'weekly', priority: r === '' ? 1 : 0.7 }));
}
