'use client';

import { useStoreModal } from '@/store/zustand';
import { useEffect } from 'react';

export default function SetupPage() {
  const { onOpen, isOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
