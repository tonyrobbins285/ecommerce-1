import { UserButton, auth } from '@clerk/nextjs';
import React from 'react';
import MainNav from '@/components/main-nav';
import { StoreSwitcher } from './store-switcher';
import { prisma } from '@/lib/prismadb';
import { ThemeToggle } from './theme-toggle';

export async function Navbar() {
  const { userId } = auth();

  if (!userId) return null;

  const stores = await prisma.store.findMany({ where: { userId } });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher stores={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </div>
  );
}
