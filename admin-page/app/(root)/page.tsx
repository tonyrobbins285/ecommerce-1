'use client';

import { useEffect } from 'react';

import { useCreateStoreModalStore } from '@/store/zustand';

export default function SetupPage() {
  const { isOpen, onOpen } = useCreateStoreModalStore();
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
