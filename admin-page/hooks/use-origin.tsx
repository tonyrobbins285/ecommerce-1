'use client';
import { useEffect, useState } from 'react';

export default function useOrigin() {
  const [isMounted, setIsMounted] = useState(false);
  const origin =
    (typeof window !== 'undefined' && window?.location?.origin) || '';

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return origin;
}
