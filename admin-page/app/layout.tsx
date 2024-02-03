import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from 'react-hot-toast';
import CreateStoreModal from '@/components/modals/create-store-modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
};

export const dynamic = 'force-static';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-slate-900`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Toaster position="top-center" reverseOrder={false} />
          <CreateStoreModal />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
