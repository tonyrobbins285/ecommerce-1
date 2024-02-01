import React from 'react';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 pt-6">{children}</div>;
}
