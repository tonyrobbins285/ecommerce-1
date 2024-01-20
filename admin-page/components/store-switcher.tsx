'use client';
import { Store } from '@prisma/client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCreateStoreModalStore } from '@/store/zustand';

import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type StoreSwitcherProps = {
  stores: Store[];
};

export function StoreSwitcher({ stores }: StoreSwitcherProps) {
  const [open, setOpen] = useState(false);

  const { onOpen } = useCreateStoreModalStore();
  const params = useParams();
  const router = useRouter();

  const currentStore = stores.find((store) => store.id === params.storeId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-white dark:bg-slate-900"
        >
          <div className="flex items-center gap-2">
            <StoreIcon className="mr-2 h-4 w-4" />
            {currentStore?.name}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-white dark:bg-slate-900">
          <CommandInput placeholder="Search store" />
          <CommandList>
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {stores.map((store) => (
                <CommandItem
                  key={store.id}
                  onSelect={() => {
                    setOpen(false);
                    router.push(`/${store.id}`);
                  }}
                  className="cursor-pointer"
                >
                  {store.name}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentStore?.id === store.id
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                className="cursor-pointer"
                onSelect={() => {
                  setOpen(false);
                  onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
