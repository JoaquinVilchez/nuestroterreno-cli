'use client';

import theme from '@/theme';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Providers from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}
