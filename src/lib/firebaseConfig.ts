/**
 * Firebase Production Configuration & Schema Adapter
 *
 * This module exports the Firestore collection constants, types, and initialization
 * logic ready for Firebase Authentication, Firestore, and Storage.
 *
 * To connect to your live Firebase project, configure the environment variables
 * in `.env.local`:
 *
 * NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
 * NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
 * NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
 * NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
 * NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
 * NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
 */

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  CUSTOMERS: 'customers',
  PLANS: 'plans',
  SUBSCRIPTIONS: 'subscriptions',
  FARMS: 'farms',
  PLOTS: 'plots',
  CROPS: 'crops',
  CROP_CYCLES: 'crop_cycles',
  PRODUCE: 'produce',
  HARVESTS: 'harvests',
  DELIVERIES: 'deliveries',
  PAYMENTS: 'payments',
  FARM_UPDATES: 'farm_updates',
  FARM_MEDIA: 'farm_media',
  NOTIFICATIONS: 'notifications',
  LEADS: 'leads',
  SUPPORT_REQUESTS: 'support_requests',
} as const;

export interface FirebaseConfigStatus {
  isConfigured: boolean;
  projectId?: string;
  authDomain?: string;
}

export function getFirebaseConfigStatus(): FirebaseConfigStatus {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (apiKey && projectId) {
    return {
      isConfigured: true,
      projectId,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    };
  }

  return {
    isConfigured: false,
  };
}

/**
 * Razorpay Payment Gateway integration hook skeleton
 * Ready for server-side key verification.
 */
export const RAZORPAY_CONFIG = {
  keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  currency: 'INR',
  companyName: 'Farm-to-Family Agro Labs Pvt Ltd',
};
