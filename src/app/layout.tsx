// src/app/layout.tsx

'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import Providers from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
