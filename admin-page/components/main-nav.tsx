'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useParams, usePathname } from 'next/navigation';

import { getMainNavRoutes } from '@/helpers/get-routes';

import { Check } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import ListItem from './ui/list-item';

export default function Mainnav() {
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
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="w-56 justify-between border bg-transparent">
                {active?.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-56 bg-white py-2 dark:bg-slate-900">
                  {routes.map((route) => (
                    <ListItem
                      className="mx-1 flex items-center p-2 hover:rounded-sm hover:bg-slate-800"
                      key={route.href}
                      title={route.label}
                      href={route.href}
                    >
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          active?.label === route.label
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
