'use client';

import { useEffect } from 'react';

import { useModalStore } from '@/hooks/use-modal-store';

export default function SetupPage() {
  const { isOpen, onOpen } = useModalStore();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
