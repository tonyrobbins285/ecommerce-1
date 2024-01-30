'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { getMainNavRoutes } from '@/helpers/get-routes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, ArrowUp, Check } from 'lucide-react';

export default function Mainnav() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const params = useParams();

  const routes = getMainNavRoutes(params, pathname);

  const active = routes.find((route) => route.active);

  return (
    <>
      <nav className="mx-6 hidden items-center gap-6 lg:flex">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              route.active
                ? 'text-black dark:text-white'
                : 'text-muted-foreground',
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <div className="mx-6 hidden sm:block lg:hidden">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className="bg-white dark:bg-slate-900" asChild>
            <Button variant="outline" className="relative w-56 justify-between">
              <span>{active?.label}</span>
              <ArrowDown
                className={cn(
                  'absolute right-3 h-4 w-4 text-muted-foreground transition-all',
                  open && 'rotate-180 opacity-0',
                )}
              />
              <ArrowUp
                className={cn(
                  'absolute right-3 h-4 w-4 text-muted-foreground transition-all',
                  !open && 'rotate-180 opacity-0',
                )}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-slate-900">
            <DropdownMenuGroup>
              {routes.map((route) => (
                <Link key={'dropdown' + route.href} href={route.href}>
                  <DropdownMenuItem className="cursor-pointer">
                    <span>{route.label}</span>
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        active?.label === route.label
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
