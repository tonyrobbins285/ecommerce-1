'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modals/alert-modal';

type DeleteBtnType = {
  section: string;
  sectionId: string;
};

export default function DeleteBtn({ section, sectionId }: DeleteBtnType) {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/${params.storeId}/${section}/${params[sectionId]}`,
      );
      router.refresh();
      router.push(`/${params.storeId}/${section}`);
      toast.success('Deleted successfully');
    } catch (error) {
      toast.error(
        `Something goes wrong! Make sure you removed all products using this ${section} first.`,
      );
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        isLoading={isLoading}
      />
      <Button
        disabled={isLoading}
        variant="destructive"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
}
