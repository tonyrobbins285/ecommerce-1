'use client';
import { Store } from '@prisma/client';
import { HTMLAttributes, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useModalStore } from '@/hooks/use-modal-store';

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

type StoreSwitcherProps = HTMLAttributes<HTMLElement> & {
  stores: Store[];
};

export function StoreSwitcher({ className, stores = [] }: StoreSwitcherProps) {
  const [open, setOpen] = useState(false);

  const { onOpen } = useModalStore();
  const params = useParams();
  const router = useRouter();

  const formattedStores = stores.map((store) => ({
    label: store.name,
    value: store.id,
  }));

  const currentStore = formattedStores.find(
    (store) => store.value === params.storeId,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Store"
          className={cn('w-[200px] justify-between', className)}
        >
          <div className="flex items-center gap-2">
            <StoreIcon className="mr-2 h-4 w-4" />
            {currentStore?.label}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={currentStore?.label} />
          <CommandList>
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedStores.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => {
                    console.log(store);
                    setOpen(false);
                    router.push(`/${store.value}`);
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {store.label}
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
