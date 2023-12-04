'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';

import { ColorColumns } from './columns';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modals/alert-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type CellActionProps = { data: ColorColumns };

export default function CellAction({ data }: CellActionProps) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Color Id copied to the clipboard.');
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${data.id}`);
      router.refresh();
      toast.success(`Color ${data.name} is deleted!`);
    } catch (error) {
      toast.error(
        'Something goes wrong! Something goes wrong! Make sure you removed all products using this color first.',
      );
    } finally {
      setIsLoading(false);
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy Id</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Update</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
