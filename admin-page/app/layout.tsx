import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/providers/theme-provider';

import './globals.css';

import CreateStoreModal from '@/components/modals/create-store-modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dashboard',
  description: 'E-Commerce Dashboard',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-white dark:bg-slate-900`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster position="top-center" reverseOrder={false} />
            <CreateStoreModal />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
