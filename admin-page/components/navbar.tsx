import { prisma } from '@/lib/prismadb';
import MainNav from '@/components/main-nav';
import { UserButton, auth } from '@clerk/nextjs';

import { StoreSwitcher } from './store-switcher';
import { ThemeToggle } from './theme-toggle';
import Container from './container';

export async function Navbar() {
  const { userId } = auth();

  if (!userId) return null;

  const stores = await prisma.store.findMany({ where: { userId } });
  console.log(stores);
  return (
    <div className="border-b">
      <Container>
        <div className="flex h-16 items-center">
          <StoreSwitcher stores={stores} />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </Container>
    </div>
  );
}
