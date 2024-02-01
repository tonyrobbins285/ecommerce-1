'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';

export default function Add({ section }: { section: string }) {
  const router = useRouter();
  const params = useParams();

  return (
    <Button
      className="w-[50%] sm:w-[40%] md:w-auto"
      onClick={() => router.push(`/${params.storeId}/${section}/new`)}
    >
      <Plus className="mr-2 h-4 w-4" />
      <p>Add new</p>
    </Button>
  );
}
