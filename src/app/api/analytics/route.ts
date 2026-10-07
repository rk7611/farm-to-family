import { NextRequest, NextResponse } from 'next/server';

interface StoredEvent {
  id: string;
  event: string;
  visitorId: string;
  path: string;
  country: string;
  city: string;
  ip: string;
  timestamp: string;
  metadata: Record<string, any>;
}

// In-memory ring buffer of events for staging
const MAX_EVENTS = 500;
let eventsLog: StoredEvent[] = [
  {
    id: 'init-01',
    event: 'plan_interest_20k',
    visitorId: 'v_demo_pilot',
    path: '/plans',
    country: 'IN',
    city: 'Bengaluru',
    ip: '106.51.x.x',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    metadata: { plan: 'My Dedicated Farm', price: 20000, context: 'homepage_plans' },
  },
  {
    id: 'init-02',
    event: 'build_farm_complete',
    visitorId: 'v_demo_pilot_2',
    path: '/build-your-farm',
    country: 'IN',
    city: 'Pune',
    ip: '49.36.x.x',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    metadata: { familySize: '3–4', cropsCount: 5, recommendedPlan: 'My Dedicated Farm' },
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract Geo headers from Vercel / Cloudflare edge
    const country =
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('cf-ipcountry') ||
      req.headers.get('x-country') ||
      'IN';

    const city =
      req.headers.get('x-vercel-ip-city') ||
      req.headers.get('x-city') ||
      (country === 'IN' ? 'Bengaluru' : 'Unknown');

    const forwardedFor = req.headers.get('x-forwarded-for') || '';
    const ip = forwardedFor.split(',')[0].trim() || '127.0.0.1';

    const newEvent: StoredEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      event: body.event,
      visitorId: body.visitorId || 'anon',
      path: body.path || '/',
      country,
      city: decodeURIComponent(city),
      ip: ip.replace(/\.\d+$/, '.x'), // Anonymize last octet
      timestamp: body.timestamp || new Date().toISOString(),
      metadata: body.metadata || {},
    };

    eventsLog.unshift(newEvent);
    if (eventsLog.length > MAX_EVENTS) {
      eventsLog = eventsLog.slice(0, MAX_EVENTS);
    }

    return NextResponse.json({ success: true, eventId: newEvent.id });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to record event' }, { status: 400 });
  }
}

export async function GET() {
  // Aggregate stats
  const uniqueVisitors = new Set(eventsLog.map((e) => e.visitorId)).size;
  const totalEvents = eventsLog.length;

  const countryCounts: Record<string, number> = {};
  const cityCounts: Record<string, number> = {};
  const eventCounts: Record<string, number> = {
    page_view: 0,
    plan_view: 0,
    plan_interest_10k: 0,
    plan_interest_20k: 0,
    plan_interest_700k: 0,
    build_farm_start: 0,
    build_farm_complete: 0,
    lead_submission: 0,
    whatsapp_click: 0,
    advisor_enquiry: 0,
    visit_enquiry: 0,
  };

  eventsLog.forEach((e) => {
    countryCounts[e.country] = (countryCounts[e.country] || 0) + 1;
    if (e.city && e.city !== 'Unknown') {
      cityCounts[e.city] = (cityCounts[e.city] || 0) + 1;
    }
    if (eventCounts[e.event] !== undefined) {
      eventCounts[e.event] += 1;
    }
  });

  return NextResponse.json({
    metrics: {
      totalEvents,
      uniqueVisitors,
      eventCounts,
      topCountries: Object.entries(countryCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      topCities: Object.entries(cityCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
    },
    recentEvents: eventsLog.slice(0, 50),
    stagingStatus: {
      isStaging: process.env.NEXT_PUBLIC_IS_STAGING === 'true',
      indexingBlocked: process.env.NEXT_PUBLIC_ENABLE_INDEXING !== 'true',
      domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'purevegies.ethnicaa.com',
    },
  });
}
