import prismadb from '@/lib/prismadb';
import MainNav from '@/components/main-nav';
import { UserButton, auth } from '@clerk/nextjs';

import { StoreSwitcher } from './store-switcher';
import { ThemeToggle } from './theme-toggle';
import Container from './ui/container';
import { NavDrawer } from './ui/nav-drawer';

export async function Navbar() {
  const { userId } = auth();

  if (!userId) return null;

  const stores = await prismadb.store.findMany({ where: { userId } });

  return (
    <div className="border-b">
      <Container>
        <div className="flex h-16 items-center">
          <StoreSwitcher stores={stores} />
          {/* Mobile Menu */}
          <NavDrawer />
          <MainNav />
          <div className="ml-auto hidden items-center gap-4 sm:flex">
            <ThemeToggle />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </Container>
    </div>
  );
}
