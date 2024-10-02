// src/app/layout.tsx

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import Providers from './providers';

export const metadata = {
  title: 'Nuestro Terreno 2024 - MVT',
  icons: {
    icon: '/favicon.ico', // Ruta a tu favicon
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <html lang="es">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
