'use client';

import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

