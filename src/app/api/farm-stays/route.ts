import { NextRequest, NextResponse } from 'next/server';
import { FarmStayEnquiry } from '@/lib/types';
import { INITIAL_FARM_STAYS } from '@/lib/mockData';

// In-memory store for staging/demo
let farmStaysStore: FarmStayEnquiry[] = [...INITIAL_FARM_STAYS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const experience = searchParams.get('experience');
  const city = searchParams.get('city');
  const status = searchParams.get('status');

  let filtered = [...farmStaysStore];

  if (experience && experience !== 'all') {
    filtered = filtered.filter((s) => s.preferredExperience === experience);
  }

  if (city && city !== 'all') {
    filtered = filtered.filter((s) => s.city.toLowerCase().includes(city.toLowerCase()));
  }

  if (status && status !== 'all') {
    filtered = filtered.filter((s) => s.status === status);
  }

  // Calculate summary metrics
  const total = farmStaysStore.length;
  const retirementCount = farmStaysStore.filter((s) => s.preferredExperience === 'retirement').length;
  const weekendCount = farmStaysStore.filter((s) => s.preferredExperience === 'weekend').length;
  const familyCount = farmStaysStore.filter((s) => s.preferredExperience === 'family').length;
  const couplesCount = farmStaysStore.filter((s) => s.preferredExperience === 'couples').length;
  const extendedCount = farmStaysStore.filter((s) => s.preferredExperience === 'extended').length;
  const privateCount = farmStaysStore.filter((s) => s.preferredExperience === 'private').length;

  return NextResponse.json({
    success: true,
    enquiries: filtered,
    stats: {
      total,
      retirementCount,
      weekendCount,
      familyCount,
      couplesCount,
      extendedCount,
      privateCount,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const country =
      body.country ||
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('cf-ipcountry') ||
      'India';

    const city =
      body.city ||
      req.headers.get('x-vercel-ip-city') ||
      'Bengaluru';

    const newEnquiry: FarmStayEnquiry = {
      id: `stay-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      fullName: body.fullName || 'Anonymous Guest',
      email: body.email,
      phone: body.phone,
      whatsapp: body.whatsapp || body.phone,
      country,
      city: decodeURIComponent(city),
      preferredExperience: body.preferredExperience || 'weekend',
      travellingWith: body.travellingWith || 'Partner',
      duration: body.duration || 'Two nights',
      budgetRange: body.budgetRange || '₹10,000–₹25,000',
      preferredDistance: body.preferredDistance || 'Within 2 hours of my city',
      priorityInterest: body.priorityInterest,
      notes: body.notes || '',
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    farmStaysStore.unshift(newEnquiry);

    return NextResponse.json({
      success: true,
      enquiry: newEnquiry,
      message:
        'Thank you for your interest in PureVegies Farm Stays. We are exploring experiences for different travellers and life stages. We will share relevant updates as plans develop.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid submission format' },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, feedbackNotes } = await req.json();

    const index = farmStaysStore.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }

    if (status) farmStaysStore[index].status = status;
    if (feedbackNotes !== undefined) farmStaysStore[index].feedbackNotes = feedbackNotes;

    return NextResponse.json({ success: true, enquiry: farmStaysStore[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 400 });
  }
}
