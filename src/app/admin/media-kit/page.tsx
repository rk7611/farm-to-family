'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminMediaKitRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/social-media');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#102115] text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-[#A1D1AF] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-[#A1D1AF]">Redirecting to Admin Social Media Studio...</span>
      </div>
    </div>
  );
}
