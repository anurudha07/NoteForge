'use client';

import { Suspense } from 'react';
import VerifyPageContent from './verify-content';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPageContent />
    </Suspense>
  );
}
