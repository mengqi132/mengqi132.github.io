'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/lib/theme';
import { LangProvider } from '@/lib/i18n';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}
