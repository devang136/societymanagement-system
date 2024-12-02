import React, { Suspense } from 'react';
import ServiceComplaintApp from './servicecomplaintApp';
import { ErrorBoundary } from '../../ErrorBoundary';

export function ServiceComplaintRoute() {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="text-gray-500">Loading...</div>
        </div>
      }>
        <div className="flex-1 overflow-auto">
          <ServiceComplaintApp />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
} 