import { MetadataRoute } from 'next';
import { isSearchIndexingAllowed, getSiteUrl } from '@/lib/envConfig';

export default function robots(): MetadataRoute.Robots {
  const allowIndexing = isSearchIndexingAllowed();
  const siteUrl = getSiteUrl();

  if (!allowIndexing) {
    // STRICT STAGING / TESTING PROTECTION:
    // Disallows all search engines and crawlers on temporary subdomain
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
