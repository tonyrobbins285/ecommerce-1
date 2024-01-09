'use client';
import { Button } from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';
import { Color, Size } from '@/types';
import { Dialog } from '@headlessui/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import Filter from './filter';

type MobileFilterProps = {
  sizes: Size[];
  colors: Color[];
};

export default function MobileFilter({ sizes, colors }: MobileFilterProps) {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-2 lg:hidden">
        <span>Filter</span>
        <Plus size={20} />
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-40  lg:hidden"
        onClose={onClose}
      >
        {/* Background */}
        <div className="fixed inset-0 bg-black/25"></div>
        {/* Dialog */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Close button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            {/* Render the filters */}
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
