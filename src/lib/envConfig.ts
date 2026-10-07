/**
 * Centralized Application Environment & Domain Configuration
 *
 * IMPORTANT: The domain and staging flags are loaded dynamically from environment
 * variables and are NEVER hard-coded in database models, customer records, or business logic.
 *
 * Changing the domain later requires ONLY updating NEXT_PUBLIC_APP_URL and NEXT_PUBLIC_SITE_DOMAIN
 * in environment variables.
 */

export interface EnvConfig {
  siteUrl: string;
  siteDomain: string;
  isStaging: boolean;
  isIndexingEnabled: boolean;
  googleAnalyticsId?: string;
  whatsappNumber: string;
}

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://purevegies.ethnicaa.com');
  return url.replace(/\/$/, '');
}

export function getSiteDomain(): string {
  return process.env.NEXT_PUBLIC_SITE_DOMAIN || 'purevegies.ethnicaa.com';
}

export function isStagingEnvironment(): boolean {
  if (process.env.NEXT_PUBLIC_IS_STAGING !== undefined) {
    return process.env.NEXT_PUBLIC_IS_STAGING === 'true';
  }
  // Default to staging when hosted on ethnicaa.com subdomain
  if (typeof window !== 'undefined') {
    return window.location.hostname.includes('ethnicaa.com') || window.location.hostname === 'localhost';
  }
  return true;
}

export function isSearchIndexingAllowed(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true';
}

export function getGoogleAnalyticsId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_ID || undefined;
}

export function getAppConfig(): EnvConfig {
  return {
    siteUrl: getSiteUrl(),
    siteDomain: getSiteDomain(),
    isStaging: isStagingEnvironment(),
    isIndexingEnabled: isSearchIndexingAllowed(),
    googleAnalyticsId: getGoogleAnalyticsId(),
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91 98450 12345',
  };
}
