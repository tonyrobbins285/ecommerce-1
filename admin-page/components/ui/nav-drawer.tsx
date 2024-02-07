'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Separator } from './separator';
import { ThemeToggle } from '../theme-toggle';
import { getMainNavRoutes } from '@/helpers/get-routes';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
// import { UserButton } from '@clerk/nextjs';
import { useParams, usePathname } from 'next/navigation';

export function NavDrawer() {
  const params = useParams();
  const pathname = usePathname();

  const routes = getMainNavRoutes(params, pathname);

  return (
    <div className="ml-auto sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[50%] bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between py-5">
            <ThemeToggle />
            {/* <UserButton afterSignOutUrl="/sign-in" /> */}
          </div>
          <Separator />
          <div className="grid min-h-[60%] items-center">
            {routes.map((route) => (
              <SheetClose key={route.href} asChild>
                <Link
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
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
