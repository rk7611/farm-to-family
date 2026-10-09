'use client';

export type AnalyticsEventName =
  | 'page_view'
  | 'plan_view'
  | 'plan_interest_10k'
  | 'plan_interest_20k'
  | 'plan_interest_700k'
  | 'build_farm_start'
  | 'build_farm_complete'
  | 'lead_submission'
  | 'whatsapp_click'
  | 'advisor_enquiry'
  | 'visit_enquiry'
  | 'farm_stay_page_view'
  | 'weekend_stay_interest'
  | 'family_vacation_interest'
  | 'retirement_stay_interest'
  | 'couples_retreat_interest'
  | 'extended_stay_interest'
  | 'farm_stay_form_start'
  | 'farm_stay_lead_submitted';

export interface AnalyticsPayload {
  event: AnalyticsEventName;
  path?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

// Generate or retrieve persistent anonymous visitor ID
function getVisitorId(): string {
  if (typeof window === 'undefined') return 'server';
  let vid = localStorage.getItem('ftf_vid');
  if (!vid) {
    vid = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    localStorage.setItem('ftf_vid', vid);
  }
  return vid;
}

export async function trackEvent(
  event: AnalyticsEventName,
  metadata: Record<string, any> = {}
): Promise<void> {
  if (typeof window === 'undefined') return;

  const payload = {
    event,
    visitorId: getVisitorId(),
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
    timestamp: new Date().toISOString(),
    metadata,
  };

  // Dispatch to internal API
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', JSON.stringify(payload));
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch (e) {
    // Analytics failures must never crash the app
  }

  // Also notify Google Analytics (if configured)
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gaId && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', event, metadata);
  }
}

// Convenience helpers
export const analytics = {
  pageView: (path: string) => trackEvent('page_view', { path }),
  planView: (planId: string) => trackEvent('plan_view', { planId }),
  interest10k: (context: string) => trackEvent('plan_interest_10k', { plan: "My Family's Farm", price: 10000, context }),
  interest20k: (context: string) => trackEvent('plan_interest_20k', { plan: 'My Dedicated Farm', price: 20000, context }),
  interest700k: (context: string) => trackEvent('plan_interest_700k', { plan: 'My Private Farm', price: 700000, context }),
  buildFarmStart: () => trackEvent('build_farm_start', { step: 1 }),
  buildFarmComplete: (data: Record<string, any>) => trackEvent('build_farm_complete', data),
  leadSubmission: (data: Record<string, any>) => trackEvent('lead_submission', data),
  whatsappClick: (context: string, label?: string) => trackEvent('whatsapp_click', { context, label }),
  advisorEnquiry: (planTier: string, title?: string) => trackEvent('advisor_enquiry', { planTier, title }),
  visitEnquiry: (farmId: string, preferredDate?: string) => trackEvent('visit_enquiry', { farmId, preferredDate }),
};
